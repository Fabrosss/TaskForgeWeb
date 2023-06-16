import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
interface User {
  userMail: string;
  password: string;
}
@Injectable()

export class AuthService {
  private apiUrl ='http://localhost:8081/user/login';

  constructor(private http: HttpClient){}

  login(userMail: string, password: string): Observable<any> {
    const user: User = {userMail, password};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl, user, {headers});
  }
}
