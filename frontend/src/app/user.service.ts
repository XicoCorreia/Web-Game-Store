import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Item } from '../item';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUserByUsername(name: string): Observable<User> {
    const url = `${this.userUrl}/${name}`;
    return this.http.get<User>(url).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  updateUser(user: User): Observable<object> {
    const url = `${this.userUrl}/${user.username}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  addItemToWishlist(name: string, title: string): Observable<User> {
    const url = `${this.userUrl}/wishlist`;
    return this.http.put<User>(url, { username: name, title: title }).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  getWishlist(name: string): Observable<Item[]> {
    const url = `${this.userUrl}/wishlist?username=${name}`;
    return this.http.get<Item[]>(url).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }

  follow(username: string, follow: string): Observable<any> {
    const body = { username: username, follow: follow };
    const url = `${this.userUrl}/follow`;
    return this.http.put<any>(url, body).pipe(
      catchError((error) => {
        console.error(error);
        return error;
      })
    );
  }
}
