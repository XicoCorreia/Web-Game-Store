import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  currentUser:User={} as User;
  constructor(private authService:AuthService) {}

  signup (name:string,pass:string):void{
    if (name.length >= 3 && name.match(/^[0-9a-zA-Z]+$/)) {
      //minimo 8 caracteres alfanumericos, mininmo 1 maiuscula, minuscula e 1 numero
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (pass.match(regex)) {
       // this.currentUser = this.authService.signup(name,pass);
      }
    }
  }  
}
