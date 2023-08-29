import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {User} from "../interface/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../interface/task";
import {ServerService} from "./server.service";

@Injectable()
export class TaskService {
  private apiUrl ='http://localhost:8081/task';
  public user: User;
  constructor(
                private http: HttpClient,
                private sessionService: SessionService,
                private serverService: ServerService) {
    if (!serverService.getServer()){
      this.apiUrl = 'http://localhost:3000/task'
    }
    this.user = {
      id: 0,
      name: '',
      surname: '',
      email: '',
    };
  }
  getTaskById(taskId: number) : Observable<any>{
    if(this.serverService.getServer()){
      return this.http.get<any>(this.apiUrl+ `/getTask/${taskId}`)
    }else{
      const token = this.serverService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`
      };
      return this.http.get<any>(this.apiUrl+ `/getTask/${taskId}`, {headers})
    }

  }
  getTasks() : Observable<any>{
    this.user = this.sessionService.getData("userSession");
    return this.http.get<any>(this.apiUrl + `/user/${this.user.id}`);
  }
  getTasksByUserStatus(status: string): Observable<any>{
    this.user = this.sessionService.getData("userSession");
    if(this.serverService.getServer()){
      return this.http.get<any>(`${this.apiUrl}/user/${this.user.id}/${status}`)
    }else{
      const token = this.serverService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`
      };
      return this.http.get<any>(`${this.apiUrl}/user/${this.user.id}/${status}`, {headers})
    }
  }
  editTask(task: Task) : Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if(this.serverService.getServer()){

      return this.http.put<Task>(this.apiUrl + `/edit`, task, httpOptions);

    }else{
      const token = this.serverService.getToken();
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
      return this.http.put<Task>(this.apiUrl + `/edit`, {task}, httpOptions);

    }
  }

  newTask(userAdded: String, task: Task): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if(this.serverService.getServer()){
      return this.http.put<Task>(this.apiUrl +`/new/${userAdded}`, task, httpOptions);
    }else{
      const token = this.serverService.getToken();
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };

      return this.http.put<Task>(this.apiUrl +`/new/${userAdded}`, task, httpOptions);
    }
  }

  deleteTask(id: number) : Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (this.serverService.getServer()) {
      return this.http.delete<any>(this.apiUrl + `/delete/${id}`, httpOptions);
    } else {
      const token = this.serverService.getToken();
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
      return this.http.delete<any>(this.apiUrl + `/delete/${id}`, httpOptions)
    }
  }
  getAllTasks(status: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (this.serverService.getServer()) {
      return this.http.get<any>(this.apiUrl + `/allTasks${status}`, httpOptions);
    } else {
      const token = this.serverService.getToken();
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
      return this.http.get<any>(this.apiUrl + `/allTasks/${status}`, httpOptions)
    }
  }
}
