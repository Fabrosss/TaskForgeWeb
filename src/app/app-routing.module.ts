import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login-component/login.component";
import {PresentTasksComponent} from "./tasks/present-tasks/present-tasks.component";
import {PastTasksComponent} from "./tasks/past-tasks/past-tasks.component";
import {FutureTasksComponent} from "./tasks/future-tasks/future-tasks.component";
import {EditTaskComponent} from "./tasks/edit-task/edit-task.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'present', component: PresentTasksComponent},
  {path: 'past', component: PastTasksComponent},
  {path: 'future', component: FutureTasksComponent},
  {path: 'edit/:id', component: EditTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomepageComponent, LoginComponent];
