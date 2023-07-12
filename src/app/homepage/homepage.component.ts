import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../interface/user";
import {SessionService} from "../service/session.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  public user: User;
    constructor(
      private userService: UserService,
      private sessionService: SessionService,
      private authService: AuthService,
                ) {
      this.user = {
        id: 0,
        name: '',
        surname: '',
        email: ''
      };
    }
    ngOnInit() {
       this.user = this.sessionService.getData("userSession");
       console.log(this.user);
      this.authService.getIsLoggedIn();
    }
}
