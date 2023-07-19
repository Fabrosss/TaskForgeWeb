import { Component } from '@angular/core';

@Component({
  selector: 'app-past-tasks',
  templateUrl: './past-tasks.component.html',
  styleUrls: ['./past-tasks.component.css']
})
export class PastTasksComponent {
  taskStatus: string;
  constructor() {
    this.taskStatus = "past";
  }

}
