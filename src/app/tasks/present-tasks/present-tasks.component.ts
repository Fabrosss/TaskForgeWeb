import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from '../../interface/task';
import {tap} from "rxjs";

@Component({
  selector: 'app-present-tasks',
  templateUrl: './present-tasks.component.html',
  styleUrls: ['./present-tasks.component.css']
})
export class PresentTasksComponent {
  taskStatus: string;
  constructor() {
    this.taskStatus = "present";
  }

}
