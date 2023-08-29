import {Injectable} from "@angular/core";
import {User} from "../interface/user";
import {SessionService} from "./session.service";
import {ServerService} from "./server.service";

interface Role {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService{
  private user: User = {
    id: 0,
    name: '',
    surname: '',
    email: ''
  };

  constructor(
    private sessionService: SessionService,
    private serverService: ServerService
  ) {}
  getUser(){
    return this.user;
  }

  setUser(user: User){
    this.user = user;
  }

   ifUserHasRole(roleName: string): boolean {
    if(this.serverService.getServer()){
      const roles: Role[] = this.sessionService.getData("userSession").roles;
      return roles.some(role => role.name.includes(roleName));
    }else{
      const roles: Role[] = this.sessionService.getData("userRoles");
      return roles.some(role => role.name.includes(roleName));
    }

  }
}

