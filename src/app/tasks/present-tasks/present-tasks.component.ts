import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from '../../interface/task';
import {tap} from "rxjs";

@Component({
  selector: 'app-present-tasks',
  templateUrl: './present-tasks.component.html',
  styleUrls: ['./present-tasks.component.css']
})
export class PresentTasksComponent implements OnInit {
  tasks: Task[];
  constructor(private taskService: TaskService) {
    this.tasks = [];
  }
  ngOnInit(): void {
    this.taskService.getTasks()
      .pipe(
        tap(response => {
          this.tasks = response;
        })
      )
      .subscribe();
  }


}
