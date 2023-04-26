import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { catchError, Observable, tap } from 'rxjs';

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

  signup(name: string, pass: string): Observable<User> {
    return this.http
      .post<User>(
        `${this.userUrl}/users/signup`,
        { username: name, password: pass },
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }

  login(name: string, pass: string): Observable<User> {
    return this.http
      .get<User>(
        `${this.userUrl}/users/login?username=${name}&password=${pass}`
      )
      .pipe(
        tap((user: User) => {
          this.currentUser = user;
          this.isloggedIn = true;
        }),
        catchError((error) => {
          console.error(error);
          this.isloggedIn = false;
          throw error;
        })
      );
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  canActivate(): boolean {
    return this.isloggedIn;
  }
}
