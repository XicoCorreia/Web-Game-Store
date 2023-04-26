import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  currentUser: User = {} as User;
  feedback = '';

  constructor(private authService: AuthService) {}

  /*
  signup(name: string, pass: string, pass2:string): void {
    if (pass === pass2) {
      if (name.length >= 3 && name.match(/^[0-9a-zA-Z]+$/)) {
        //minimo 8 caracteres alfanumericos, mininmo 1 maiuscula, minuscula e 1 numero
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (pass.match(regex)) {
          this.authService.signup(name, pass).subscribe((user: User) => {
            this.currentUser = user;
            this.feedback = 'Registo efetuado com sucesso!';
          });
        } else {
          this.feedback = 'Password não cumpre os requisitos! Tente outra password.';
        }
      } else {
        this.feedback = 'Username não cumpre os requisitos! Tente outro username.';
      }
    } else {
      this.feedback = 'Passwords não coincidem! Tente novamente.';
    }
  }
}
*/
  signup (name: string, pass: string, pass2:string): void{
    if (pass === pass2) {
      if (name.length >= 3) {
        if (name.match(/^[0-9a-zA-Z]+$/)) {
          //minimo 8 caracteres alfanumericos, mininmo 1 maiuscula, minuscula e 1 numero
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          if (pass.match(regex)) {
            this.authService.signup(name, pass).subscribe((user: User) => {
              this.currentUser = user;
              this.feedback = 'Registo efetuado com sucesso!';
            });
          } else {
            if (!/(?=.*[a-z])/.test(pass)) {
              this.feedback += 'A senha precisa ter pelo menos uma letra minúscula.';
            }
            if (!/(?=.*[A-Z])/.test(pass)) {
              this.feedback += 'A senha precisa ter pelo menos uma letra maiúscula.';
            }
            if (!/(?=.*\d)/.test(pass)) {
              this.feedback += 'A senha precisa ter pelo menos um número.';
            }
            if (!/^[a-zA-Z\d]{8,}$/.test(pass)) {
              this.feedback += 'A senha precisa ter pelo menos 8 caracteres alfanuméricos.';
            }
          }
        } else {
          this.feedback = 'Username só pode ter caracteres alfanuméricos!';
        }
      } else {
        this.feedback = 'Username tem que ter no mínimo 3 caracteres alfanuméricos!';
      }
    } else {
      this.feedback = 'Passwords não coincidem!';
    }
  }
}