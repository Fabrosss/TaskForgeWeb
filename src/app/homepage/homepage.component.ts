import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
    constructor(private AuthService: AuthService,
                private router: Router) {
    }
    ngOnInit() {
      this.AuthService.getIsLoggedIn();
    }
}
