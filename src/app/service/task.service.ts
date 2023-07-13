import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {User} from "../interface/user";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TaskService {
  private apiUrl ='http://localhost:8081/task';
  public user: User;
  constructor(
    private http: HttpClient,
               private sessionService: SessionService) {
    this.user = {
      id: 0,
      name: '',
      surname: '',
      email: '',
    };
  }
  getTaskById(taskId: number) : Observable<any>{
    return this.http.get<any>(this.apiUrl+ `/getTask/${taskId}`)
  }
  getTasks() : Observable<any>{
    this.user = this.sessionService.getData("userSession");
    return this.http.get<any>(this.apiUrl + `/user/${this.user.id}`);

  }
}
