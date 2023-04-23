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

  getUser(id: string): Observable<User> {
    const url = `${this.userUrl + '/profile'}/${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.userUrl}/profile/${user._id}`;
    return this.http.put(url, user, this.httpOptions);
  }

  checkUsername(name: string) {
    const url = `${this.userUrl}/profile/${name}`;
    return this.http.get(url);
  }
}
