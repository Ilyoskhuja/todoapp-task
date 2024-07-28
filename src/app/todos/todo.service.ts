import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToDo } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/todo/';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ToDo[]> {
    return this.http.get<{ results: ToDo[] }>(this.apiUrl).pipe(
      map(response => response.results),
      catchError(this.handleError<ToDo[]>('getTodos', []))
    );
  }


  getTodo(id: string): Observable<ToDo> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<ToDo>(url).pipe(
      catchError(this.handleError<ToDo>(`getTodo id=${id}`))
    );
  }

  addTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, todo).pipe(
      catchError(this.handleError<ToDo>('addTodo'))
    );
  }

  updateTodo(todo: ToDo): Observable<ToDo> {
    const url = `${this.apiUrl}${todo.id}/`;
    return this.http.put<ToDo>(url, todo).pipe(
      catchError(this.handleError<ToDo>('updateTodo'))
    );
  }

  deleteTodo(id: string): Observable<unknown> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<unknown>('deleteTodo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
