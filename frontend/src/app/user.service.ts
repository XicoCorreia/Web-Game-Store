import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Item } from '../item';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<User> {
    const url = `${this.userUrl}/${username}`;
    return this.http.get<User>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  updateUser(username: string, updatedUser: User): Observable<object> {
    const url = `${this.userUrl}/${username}`;
    return this.http.put(url, updatedUser, this.httpOptions).pipe(
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  addItemToWishlist(username: string, title: string): Observable<User> {
    const url = `${this.userUrl}/wishlist/${username}`;
    return this.http.put<User>(url, { title: title }).pipe(
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  getWishlist(username: string): Observable<Item[]> {
    const url = `${this.userUrl}/wishlist?username=${username}`;
    return this.http.get<Item[]>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  follow(username: string, usernameToFollow: string): Observable<User> {
    const url = `${this.userUrl}/follow/${usernameToFollow}`;
    return this.http.put<User>(url, { username }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  usernameExists(username: string): Observable<boolean> {
    const url = `${this.userUrl}/${username}`;
    return this.http.get<User>(url).pipe(
      map((res) => {
        if (res !== null && res.username) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
