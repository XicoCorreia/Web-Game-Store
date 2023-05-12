import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/users';
  private currentUser$!: BehaviorSubject<User>;

  constructor(private http: HttpClient, private userService: UserService) {
    const username = sessionStorage.getItem('currentUser') ?? '';
    this.currentUser$ = userService.currentUser$;
    if (username) {
      this.userService.getUser(username).subscribe((user) => {
        this.currentUser$.next(user);
      });
    }
  }

  signup(name: string, pass: string): Observable<User> {
    const body = { username: name, password: pass };
    const url = `${this.usersUrl}/signup`;
    return this.http.post<User>(url, body).pipe(
      tap((user: User) => {
        sessionStorage.setItem('currentUser', user.username);
        this.currentUser$.next(user);
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  login(name: string, pass: string): Observable<User> {
    const body = { username: name, password: pass };
    const url = `${this.usersUrl}/login`;
    return this.http.post<User>(url, body).pipe(
      tap((user: User) => {
        sessionStorage.setItem('currentUser', user.username);
        this.currentUser$.next(user);
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUser$.next({} as User);
  }
}
