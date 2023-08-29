import {Component, OnInit,} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {UserService} from "../service/user.service";
import {SessionService} from "../service/session.service";
import {StorageService} from "../service/storage.service";
import {ServerService} from "../service/server.service";

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
    private tokenService: StorageService,
    private serverService: ServerService
              ) {}

  ngOnInit(): void {
    this.sessionService.clearSession();
  }
  onLoginClick() {
    if(this.serverService.getServer()){
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
          console.log('Błąd serwerowy: ', error);
        });
    }else {
      this.authService.login(this.email, this.password)
        .pipe(
          tap(response => {
            this.sessionService.setData("userSession", response.user);
            this.sessionService.setData("userTasks", response.tasks);
            this.sessionService.setData("userRoles", response.roles);
            this.sessionService.setData("isLoggedIn", true);
            this.sessionService.setData("token", response.token);
            this.router.navigate(['/homepage']); // Przejście do HomepageComponent
          }),
          catchError(error => {
            console.log('Błąd logowania:', error);
            return throwError(error);
          })
        )
        .toPromise()
        .catch(error => {
          console.log('Błąd serwerowy: ', error);
        });

    }
  }
  onNewAccountClick() {
    this.authService.getCos()
      .pipe(
        tap(response => {
          console.log(response);
        }),
        catchError(error => {
          console.log('Błąd logowania:', error);
          return throwError(error);
        })
      )
      .toPromise()
      .catch(error => {
        console.log(error);
      });
  }
}
