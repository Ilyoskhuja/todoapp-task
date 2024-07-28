import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { ToDo } from '../models/todo.model';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todoForm: FormGroup;
  todo: ToDo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.getTodo(id).subscribe(todo => {
        this.todo = todo;
        this.todoForm.patchValue(todo);
      });
    }
  }

  save(): void {
    if (this.todoForm.valid && this.todo) {
      const updatedTodo = { ...this.todo, ...this.todoForm.value };
      this.todoService.updateTodo(updatedTodo).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
