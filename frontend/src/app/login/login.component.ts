import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  currentUser:User={} as User;

  constructor(private authService:AuthService){}

  login(name:String,pass:String):void{
    this.currentUser=this.authService.login(name,pass);
    
  }
}
