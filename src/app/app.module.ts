import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './app-header/app-header.component';
import {UserService} from "./service/user.service";
import { InterceptorComponent } from './interceptor/interceptor/interceptor.component';
import { PresentTasksComponent } from './tasks/present-tasks/present-tasks.component';
import { FutureTasksComponent } from './tasks/future-tasks/future-tasks.component';
import { PastTasksComponent } from './tasks/past-tasks/past-tasks.component';
import {TaskService} from "./service/task.service";
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    PresentTasksComponent,
    FutureTasksComponent,
    PastTasksComponent,
    EditTaskComponent,
    TaskListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers:
    [AuthService, UserService, TaskService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorComponent, multi: true }]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
