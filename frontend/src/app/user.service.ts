import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUserByUsername(name: string): Observable<User> {
    const url = `${this.userUrl + '/profile'}/${name}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/profile/${user.name}`;
    return this.http.put<User>(url, user, this.httpOptions);
  }

  checkUsername(name: string) {
    //TODO
    const url = `${this.userUrl}/profile/${name}`;
    return this.http.get(url);
  }
}
