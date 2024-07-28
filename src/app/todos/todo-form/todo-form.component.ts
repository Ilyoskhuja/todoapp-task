import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TodoService } from '../todo.service';
import { AuthService } from '../../core/auth.service';
import { ToDo } from '../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  todo: ToDo | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.getTodo(id).subscribe(todo => {
        this.todo = todo;
        this.todoForm.patchValue(todo);
      });
    }
  }

  save(): void {
    if (this.todoForm.valid) {
      const todo = this.todoForm.value as ToDo;
      const userId = this.authService.getUserId();
      if (userId !== null) {
        todo.user = userId; 
        if (this.todo) {
          todo.id = this.todo.id;
          this.todoService.updateTodo(todo).subscribe(() => this.router.navigate(['/todos']));
        } else {
          this.todoService.addTodo(todo).subscribe(() => this.router.navigate(['/todos']));
        }
      } else {
        console.error('User ID is missing');
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
