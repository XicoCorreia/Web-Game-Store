import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User = {} as User;
  private isloggedIn = false;

  private userUrl = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private http: HttpClient) {}

  signup(name: string, pass: string): User {
    this.http
      .post<User>(`${this.userUrl}/users/signup`, {
        username: name,
        password: pass,
      })
      .subscribe((data) => (this.currentUser = data));
    return this.currentUser;
  }

  login(name: string, pass: string): User {
    this.http
      .post<User>(`${this.userUrl}/users/login`, {
        username: name,
        password: pass,
      })
      .subscribe((data) => (this.currentUser = data));
    if (Object.prototype.hasOwnProperty.call(this.currentUser, 'username')) {
      this.isloggedIn = true;
      return this.currentUser;
    } else {
      this.isloggedIn = false;
      return {} as User;
    }
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  canActivate(): boolean {
    return this.isloggedIn;
  }
}
