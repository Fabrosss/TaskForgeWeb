import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../interface/task";
import {TaskService} from "../../service/task.service";
import {tap} from "rxjs";
import {ServerService} from "../../service/server.service";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() status: string ='';
  tasks: Task[];
  actualDate: Date = new Date();
  constructor(private taskService: TaskService,
              private serverService: ServerService,
              private authService: AuthService,
              private userService: UserService) {
    this.tasks = [];
  }
  ngOnInit(): void {
    this.authService.getIsLoggedIn();
    if(!this.userService.ifUserHasRole("ADMIN") ||
      !this.userService.ifUserHasRole("EDITOR")){
      this.taskService.getTasksByUserStatus(this.status)
        .pipe(
          tap(response => {
            if(this.serverService.getServer()){
              this.tasks = response;
            }else{
              this.tasks = response.tasks;
            }
          })
        )
        .subscribe();
    }else{
      this.taskService.getAllTasks(this.status)
        .pipe(
          tap(response => {
            if(this.serverService.getServer()){
              this.tasks = response;
            }else{
              this.tasks = response.tasks;
            }
          })
        )
        .subscribe();
    }

  }
}

