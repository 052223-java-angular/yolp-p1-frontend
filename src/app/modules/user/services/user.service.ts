import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/shared/models/auth';
import { LoginPayload } from 'src/app/shared/models/login-payload';
import { RegisterPayload } from 'src/app/shared/models/register-payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /* --------------------------- Methods --------------------------- */

  login(payload: LoginPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/register`, payload);
  }

  getAuth(): Auth | null {
    const auth = localStorage.getItem('auth');
    if (auth) {
      return JSON.parse(auth);
    }
    return null;
  }
}
