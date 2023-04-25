import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser:User={} as User;
  private isloggedIn:Boolean=false;

  private userUrl = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
  };

  constructor(private http: HttpClient) { }

  signup(name:String,pass:String):User{
    this.http.post<User>(`${this.userUrl}/users/signup`,{username:name,password:pass}).subscribe((data)=>this.currentUser=data);
    return this.currentUser;
  }

  login(name:String,pass:String):User{
    this.http.post<User>(`${this.userUrl}/users/login`,{username:name,password:pass}).subscribe(((data)=>this.currentUser=data));
    if(this.currentUser.hasOwnProperty('username')){
      this.isloggedIn=true;
      return this.currentUser;
    }else{
      this.isloggedIn=false;
      return {} as User;
    }
  }

  getCurrentUser():User{
    return this.currentUser;
  }

  canActivate():Boolean{
    return this.isloggedIn;
  }
}
