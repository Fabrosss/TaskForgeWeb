import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {User} from "../interface/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../interface/task";

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
  editTask(task: Task) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Task>(this.apiUrl + `/edit`, task, httpOptions);
  }
}
