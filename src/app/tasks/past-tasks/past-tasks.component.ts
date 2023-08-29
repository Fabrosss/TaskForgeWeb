import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-past-tasks',
  templateUrl: './past-tasks.component.html',
  styleUrls: ['./past-tasks.component.css']
})
export class PastTasksComponent implements OnInit {
  taskStatus: string;
  constructor(
    private authService: AuthService,
  ) {
    this.taskStatus = "past";
  }
  ngOnInit() {
    this.authService.getIsLoggedIn();
  }
}
