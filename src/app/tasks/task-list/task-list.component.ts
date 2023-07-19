import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../interface/task";
import {TaskService} from "../../service/task.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() status: string ='';
  tasks: Task[];
  actualDate: Date = new Date();
  constructor(private taskService: TaskService) {
    this.tasks = [];
  }
  ngOnInit(): void {
    this.taskService.getTasksByUserStatus(this.status)
      .pipe(
        tap(response => {
          this.tasks = response;
        })
      )
      .subscribe();
  }
}

