import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../../service/storage.service";

const TOKEN_HEADER_KEY = 'x-acces-token';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private token: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.token.getToken();
    if(token != null){
      authReq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, token), withCredentials: true});
    }
    return next.handle(authReq);
  }
}
  export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
