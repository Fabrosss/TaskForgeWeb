import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private userEmail: string;

  constructor() {
    this.userEmail ="";
  }
  getUser(){
    return this.userEmail;
  }

  setUser(userEmail: string){
    this.userEmail = userEmail;
  }
}

