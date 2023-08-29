import {Injectable} from "@angular/core";
import {SessionService} from "./session.service";


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private server: String = 'sNode - express'; // 'springBoot'
  constructor(private sessionService: SessionService ){}
  getServer(): boolean {
    return this.server !== 'Node - express';
  }
  getToken() : String {
    return this.sessionService.getData('token');
  }
}
