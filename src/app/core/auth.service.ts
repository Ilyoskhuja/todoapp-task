import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

interface LoginResponse {
  token: string;
  username: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth/token/login/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        this.localStorageService.setItem('token', response.token);
        this.localStorageService.setItem('user_id', response.user_id.toString());
      }),
      catchError(this.handleError<LoginResponse>('login'))
    );
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('user_id');
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getItem('token');
  }

  getToken(): string | null {
    return this.localStorageService.getItem('token');
  }

  getUserId(): number | null {
    const userId = this.localStorageService.getItem('user_id');
    return userId ? parseInt(userId, 10) : null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
