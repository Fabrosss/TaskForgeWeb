import {Component, OnInit} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {catchError, tap, throwError} from "rxjs";
import {SessionService} from "../service/session.service";
import {ServerService} from "../service/server.service";
import {UserService} from "../service/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class HeaderComponent implements OnInit {
  public showNewTask: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionsService: SessionService,
    private serverService: ServerService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.authService.getIsLoggedIn();
    if(this.serverService.getServer()){
      this.showNewTask =
        this.userService.ifUserHasRole("ADMIN") ||
        this.userService.ifUserHasRole("EDIT");
    }else{
      this.showNewTask =
        this.userService.ifUserHasRole("ADMIN") ||
        this.userService.ifUserHasRole("EDIT");
    }
    console.log(this.showNewTask);
    console.log(this.sessionsService.getData("userSession").roles);
  }
  logout(): void {
    this.authService.logout();
  }
}
