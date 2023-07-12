import {Component, OnInit,} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {UserService} from "../service/user.service";
import {SessionService} from "../service/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = "test@test.pl";
  password = "test";

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
              ) {}

  ngOnInit(): void {
    this.sessionService.clearSession();
  }
  onLoginClick() {
    this.authService.login(this.email, this.password)
      .pipe(
        tap(response => {
          this.sessionService.setData("userSession", response);
          this.sessionService.setData("isLoggedIn", true);
          this.router.navigate(['/homepage']); // Przejście do HomepageComponent
        }),
        catchError(error => {
          console.log('Błąd logowania:', error);
          return throwError(error);
        })
      )
      .toPromise()
      .catch(error => {
        // Obsługa błędu, jeśli wystąpił
      });
  }




}
