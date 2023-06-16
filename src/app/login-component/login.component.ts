import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email="test@test.pl";
  password="test";

  constructor(private authService: AuthService) {}


  onLoginClick() {
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          console.log(response);
          console.log('Zalogowano!')
        },
        error => {
          console.log('Blad logowanie:', error)
        }
      )
  }
}
