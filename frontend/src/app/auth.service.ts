import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User = {} as User;
  private isloggedIn = false;
  private currentUserName = '';

  private usersUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private http: HttpClient) {}

  signup(name: string, pass: string): Observable<User> {
    return this.http
      .post<User>(`${this.usersUrl}/signup`, {
        username: name,
        password: pass,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }

  login(name: string, pass: string): Observable<User> {
    const body = { username: name, password: pass };
    const url = `${this.usersUrl}/login`;
    return this.http.post<User>(url, body).pipe(
      tap((user: User) => {
        this.currentUserName = user.username;
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

  getCurrentUserObservable(): Observable<User> {
    if (this.currentUser.username) {
      return of(this.currentUser);
    } else {
      return of();
    }
  }

  getCurrentUserName(): string {
    return this.currentUserName;
  }

  canActivate(): boolean {
    return this.isloggedIn;
  }
}
