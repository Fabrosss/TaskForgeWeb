import {Injectable} from "@angular/core";
import {User} from "../interface/user";

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

  constructor() {}
  getUser(){
    return this.user;
  }

  setUser(user: User){
    this.user = user;
  }
}

