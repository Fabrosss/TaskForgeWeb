import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login-component/login.component";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './app-header/app-header.component';
import {UserService} from "./service/user.service";
import { InterceptorComponent } from './interceptor/interceptor/interceptor.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers:
    [AuthService, UserService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorComponent, multi: true }]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
