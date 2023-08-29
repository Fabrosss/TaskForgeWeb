import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {SessionService} from "./session.service";
import {User} from "../interface/user";
import {ServerService} from "./server.service";
interface UserDTO {
  email: string;
  password: string;
}

@Injectable()

export class AuthService {

  private apiUrl ='http://localhost:3000/user';
  private isLoggedIn = false;


  constructor(private http: HttpClient,
              private router: Router,
              private sessionService: SessionService,
              private serverService: ServerService){
    if(this.serverService.getServer()){
      this.apiUrl = "http://localhost:8081/user"
    }else{
      this.apiUrl = "http://localhost:3000/user"
    }

  }
  getIsLoggedIn(){
    if(!this.sessionService.getData("isLoggedIn")){
      this.router.navigate(['login']);
    }
  }

  getAllUsers(){
    if(this.serverService.getServer()){
      return this.http.get<any>(this.apiUrl + '/all');
    }else{
      const token = this.serverService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`
      };
      return this.http.get<any>(this.apiUrl + '/all',{headers});
    }

  }
  login(email: string, password: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders
    if(this.serverService.getServer()){
       headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic ' + btoa(email+ ':' + password))
        const user: UserDTO = {email, password};
        return this.http.post<any>(this.apiUrl + '/login', user, {headers});
    }else{
       headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      const user: UserDTO = {email, password};
      return this.http.post<any>(this.apiUrl + '/login', user, {headers});
    }

  }
  logout(): void {
    this.http.post<any>(this.apiUrl + '/logout', {}).subscribe(
      (response) => {
        console.log('Wylogowanie udane:', response);
        this.router.navigate(['/login']);
        this.sessionService.clearSession();
      },
      (error) => {
        console.log('Błąd wylogowania:', error);
      }
    );
  }
  getCos(): Observable<any> {
    const token = this.sessionService.getData("token");
    return this.http.post(`${this.apiUrl}/cos`, { token });
  }
  newUser(user : User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if(this.serverService.getServer()) {
      const token = this.serverService.getToken();
      return this.http.put<User>(this.apiUrl + '/newUser', {user, token}, httpOptions)
    }else{
      return this.http.put<User>(this.apiUrl + '/newUser', user, httpOptions)
    }


  }
}
