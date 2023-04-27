import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

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
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<object> {
    console.log(user);
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put(url, user, this.httpOptions);
  }

  checkUsername(name: string) {
    const url = `${this.userUrl}/${name}`;
    return this.http.get(url);
  }
}
