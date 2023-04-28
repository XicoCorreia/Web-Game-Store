import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
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

  getUserByUsername(name: String): Observable<User> {
    const url = `${this.userUrl}/${name}`;
    return this.http.get<User>(url).pipe(
      catchError((err) => {
        console.log(err);
        return of(); 
      })
    );
  }

  updateUser(user: User): Observable<object> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      catchError((err) => {
        console.log(err);
        return of(); 
      })
    );
  }

  checkUsername(name: String) {
    const url = `${this.userUrl}/${name}`;
    const user = this.http.get<User>(url).pipe(
      catchError((err) => {
        console.log(err);
        return of(); 
      })
    );
  }
}
