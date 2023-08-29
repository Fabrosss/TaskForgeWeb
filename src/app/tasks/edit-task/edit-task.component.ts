import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from "../../interface/task";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs";
import {ServerService} from "../../service/server.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  private taskId: number;
  task: Task;


  constructor(
              private taskService: TaskService,
              private activatedRoute: ActivatedRoute,
              private serverService: ServerService,
              private authService: AuthService
              ){
    this.taskId = 0;
    this.task = {
      id : 0,
      topic : "",
      description : "",
      endingDate: undefined,
      hours: 0,
      startingDate: undefined,

    }

  }
  ngOnInit(): void {
    this.authService.getIsLoggedIn();
    ({id: this.taskId} = this.activatedRoute.snapshot.params);
    this.taskService.getTaskById(this.taskId)
      .pipe(
        tap(response => {
          if(this.serverService.getServer()){
            this.task = response;
          }else{
            this.task = response.task;
          }

        })
      )
      .subscribe();
  }

  editTask() {
    this.taskService.editTask(this.task).subscribe(
      () => {
        console.log(this.task.id + " updated");
      },
      (error) => {
        console.log("Error" + error);
      }
    );
    this.closebutton.nativeElement.click();
  }
  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe(
      () =>{
        console.log(this.task.id + " deleted")
      },
      (error) => {
        console.log("Error" + error);
      }
    )
  }
}
