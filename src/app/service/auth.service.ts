import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
interface User {
  userMail: string;
  password: string;
}
@Injectable()

export class AuthService {
  private apiUrl ='http://localhost:8081/user';
  private isLoggedIn = false;

  constructor(private http: HttpClient,
              private router: Router){}
  setUserLogged(){
    this.isLoggedIn = true;
  }
  setUserLogout() {
    this.isLoggedIn = false;
  }
  getIsLoggedIn(){
    if(!this.isLoggedIn){
      this.router.navigate(['login']);
    }
  }
  login(userMail: string, password: string): Observable<any> {
    const user: User = {userMail, password};
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + btoa(userMail+ ':' + password)
      );
    return this.http.post<any>(this.apiUrl + '/login', user, {headers});
  }
  logout(): void {
    this.http.post<any>(this.apiUrl + '/logout', {}).subscribe(
      (response) => {
        console.log('Wylogowanie udane:', response);
        this.setUserLogout();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Błąd wylogowania:', error);
      }
    );
  }
}
