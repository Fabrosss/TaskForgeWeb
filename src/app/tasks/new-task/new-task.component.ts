import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../interface/user";
import {tap} from "rxjs";
import {Task} from "../../interface/task";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {TaskService} from "../../service/task.service";
import {ServerService} from "../../service/server.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  users: User[] =[];
  taskForm: FormGroup;
  user: string='';
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private serverService: ServerService) {
    this.taskForm = this.formBuilder.group({
      user: [null, Validators.required],
      topic: ['', Validators.required],
      description: ['', Validators.required],
      hours: [0, Validators.required],
      startingDate: [new Date().toISOString().substr(0, 10), Validators.required],
      endingDate: [new Date().toISOString().substr(0, 10), Validators.required]
    });
  }
  ngOnInit(): void {
    this.authService.getIsLoggedIn();
    this.authService.getAllUsers().pipe(
      tap(response => {
        if(this.serverService.getServer()){
          this.users = response;
        }else {
          console.log("response: " + response.users);
          this.users = response.users;
        }
      })
    )
      .subscribe();
  }

  newTask() {
    const userValue = this.taskForm.get('user')!.value; // Get the 'user' value from the form
    const task: Task = this.taskForm.value as Task;
    this.taskService.newTask( userValue, task).subscribe(
      () => {
        console.log(this.taskForm.value + " added");
      },
      (error) => {
        console.log("Error" + error);
      }
    );
  }
}
