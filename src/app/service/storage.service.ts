import {Injectable} from "@angular/core";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  constructor(){}
  signOut():void{
    window.sessionStorage.clear();
  }
  public saveToken(token:string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken():string{
    const token = sessionStorage.getItem(TOKEN_KEY);
    if(token){
      return token;
    }else return "";
  }
  public saveUser(user: any):void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const userJson = sessionStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
}
