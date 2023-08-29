import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {User} from "../interface/user";
import {SessionService} from "../service/session.service";
import {ServerService} from "../service/server.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  public user: User;
  public userAdmin: boolean = false;
    constructor(
      private userService: UserService,
      private sessionService: SessionService,
      private authService: AuthService,
      private serverService: ServerService
                ) {
      this.user = {
        id: 0,
        name: '',
        surname: '',
        email: ''
      };
    }
    ngOnInit() {
      this.authService.getIsLoggedIn();
      this.userAdmin = this.userService.ifUserHasRole("ADMIN");
      if(this.serverService.getServer()){
        this.user = this.sessionService.getData("userSession");
      }else{
        this.user = this.sessionService.getData("userSession");
        this.user = {
          ...this.user,
          roles: this.sessionService.getData("userRoles")
        };
      }
    }
}
