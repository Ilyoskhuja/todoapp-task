import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    const isLoginRequest = req.url.includes('/api/auth/token/login/');
    
    const authReq = isLoginRequest ? req : req.clone({
      headers: req.headers.set('Authorization', `Token ${authToken}`)
    });
    
    return next.handle(authReq);
  }
}
