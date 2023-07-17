import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from "../../interface/task";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  private taskId: number;
  task: Task;


  constructor(
              private taskService: TaskService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private modalService: NgbModal
              ){
    this.taskId = 0;
    this.task = {
      id : 0,
      topic : "",
      description : "",
      endingDate: undefined,
      hours: 0,
      startingDate: undefined,

    }

  }
  ngOnInit(): void {
    ({id: this.taskId} = this.activatedRoute.snapshot.params);
    this.taskService.getTaskById(this.taskId)
      .pipe(
        tap(response => {
          this.task = response;
        })
      )
      .subscribe();
  }

  onSubmit() {

  }

  goBack() {

  }

  openModal() {
    this.modalService.open('exampleModal');
  }
}
