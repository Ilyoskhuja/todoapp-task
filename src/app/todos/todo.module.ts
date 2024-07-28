import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoService } from './todo.service';
import { TodosRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoFormComponent,
    TodoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodosRoutingModule
  ],
  providers: [TodoService]
})
export class TodoModule { }
