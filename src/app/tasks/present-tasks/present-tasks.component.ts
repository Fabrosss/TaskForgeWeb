import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-present-tasks',
  templateUrl: './present-tasks.component.html',
  styleUrls: ['./present-tasks.component.css']
})
export class PresentTasksComponent implements OnInit {
  taskStatus: string;
  constructor( private authService: AuthService) {
    this.taskStatus = "present";
  }

  ngOnInit() {
    this.authService.getIsLoggedIn();
  }
}
