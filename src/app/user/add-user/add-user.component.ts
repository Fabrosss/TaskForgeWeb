import {Component, OnInit} from '@angular/core';
import {User} from "../../interface/user";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TaskService} from "../../service/task.service";
import {ServerService} from "../../service/server.service";
import {tap} from "rxjs";
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  activeRoles: string[] = [];
  disabledRoles: string[] = [];
  users: User[] =[];
  userForm: FormGroup;
  user: string='';
  showModal = false;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private serverService: ServerService) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: this.formBuilder.array([]),
    });
  }
    ngOnInit(): void {
      this.authService.getIsLoggedIn();
      this.authService.getAllUsers().pipe(
        tap(response => {
          if(this.serverService.getServer()){
            this.users = response;
          }else {
            console.log("response: " + response.users);
            this.users = response.users;
          }
        })
      )
        .subscribe();
    }
  toggleRole(role: string): void {
    const rolesArray = this.userForm.get('roles') as FormArray;
    const roleIndex = rolesArray.value.indexOf(role);

    if (roleIndex !== -1) {
      rolesArray.removeAt(roleIndex);
      this.activeRoles = this.activeRoles.filter(r => r !== role);
    } else {
      rolesArray.push(this.formBuilder.control(role));
      this.activeRoles.push(role);
    }
  }
  isRoleActive(role: string): boolean {
    return this.activeRoles.includes(role);
  }
  isRoleDisabled(role: string): boolean {
    return this.disabledRoles.includes(role);
  }
  validateAndOpenModal(): void {
    if (this.userForm.valid) {
      this.showModal = true;
      this.openModal();
    } else {
      this.showModal = false;
      this.userForm.markAllAsTouched();
    }
  }
  openModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('confirm-edit')!);
    modal.show();
  }
  closeModal(): void {
    this.showModal = false;
  }
  newUser(){
    const user = this.userForm.value as User;
    this.authService.newUser(user).subscribe(
      () => {
        console.log(this.userForm.value + " added");
      },
      (error) => {
        console.log("Error " + error);
      }
    )
  }
  }

