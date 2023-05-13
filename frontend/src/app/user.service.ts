import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3000/users';
  currentUser$!: BehaviorSubject<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    const username = sessionStorage.getItem('currentUser') ?? '';
    this.currentUser$ = new BehaviorSubject({} as User);
    if (username) {
      this.getUser(username).subscribe((user) => {
        this.currentUser$.next(user);
      });
    }
  }

  getUser(username: string): Observable<User> {
    const url = `${this.userUrl}/${username}`;
    return this.http.get<User>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  updateUser(username: string, updatedUser: User): Observable<User> {
    const url = `${this.userUrl}/${username}`;
    return this.http.put<User>(url, updatedUser).pipe(
      tap((user) => this.currentUser$.next(user)),
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  addItemsToWishlist(username: string, itemIds: string[]): Observable<User> {
    const url = `${this.userUrl}/wishlist/${username}`;
    return this.http.put<User>(url, { itemIds }).pipe(
      tap((user) => this.currentUser$.next(user)),
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  removeItemsFromWishlist(
    username: string,
    itemIds: string[]
  ): Observable<User> {
    const url = `${this.userUrl}/wishlist/${username}`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { itemIds },
    };
    return this.http.delete<User>(url, options).pipe(
      tap((user) => this.currentUser$.next(user)),
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  addItemsToLibrary(username: string, itemIds: string[]): Observable<User> {
    const url = `${this.userUrl}/library/${username}`;
    return this.http.put<User>(url, { itemIds }).pipe(
      tap((user) => this.currentUser$.next(user)),
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
      tap((user) => this.currentUser$.next(user)),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getFollowers(username: string): Observable<User[]> {
    const url = `${this.userUrl}/followers/${username}`;
    return this.http.get<User[]>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }
  getFollowing(username: string): Observable<User[]> {
    const url = `${this.userUrl}/following/${username}`;
    return this.http.get<User[]>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  usernameExists(username: string): Observable<boolean> {
    const url = `${this.userUrl}/${username}`;
    return this.http
      .get<User>(url)
      .pipe(map((res) => (res?.username ? true : false)));
  }
}
