import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { ENDPOINTS } from '../constants/endpoints';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpService, private storage: StorageService) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(ENDPOINTS.auth.login, credentials).pipe(
      tap((user) => this.storage.set('user', user))
    );
  }

  // register(payload: Partial<User>): Observable<User> {
  //   return this.http.post<User>(ENDPOINTS.auth.register, payload);
  // }

  logout(): void {
    this.storage.remove('user');
  }

  getToken(): string | null {
    return this.storage.get<string>('token');
  }

  isAuthenticated(): boolean {
    return true; //Boolean(this.storage.get<User>('user'));
  }
}
