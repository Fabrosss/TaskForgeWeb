import { Component } from '@angular/core';

@Component({
  selector: 'app-future-tasks',
  templateUrl: './future-tasks.component.html',
  styleUrls: ['./future-tasks.component.css']
})
export class FutureTasksComponent {
  taskStatus: string;
  constructor() {
    this.taskStatus = "future";
  }

}
