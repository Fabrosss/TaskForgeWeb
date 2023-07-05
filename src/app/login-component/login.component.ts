import {Component,} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  email = "test@test.pl";
  password = "test";

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
              ) {}


  onLoginClick() {
    this.authService.login(this.email, this.password)
      .pipe(
        tap(response => {
          console.log(response);
          this.userService.setUser(response.email);
          this.authService.setUserLogged();
          this.router.navigate(['/homepage']); // Przejście do HomepageComponent
          this.authService.setUserLogged();
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
