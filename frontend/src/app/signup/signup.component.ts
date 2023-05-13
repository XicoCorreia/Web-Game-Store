import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../../user';
import { timer } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  currentUser: User = {} as User;
  feedback = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  signup(name: string, pass: string, pass2: string): void {
    this.feedback = '';

    // Verifica se as senhas coincidem
    if (pass !== pass2) {
      this.feedback = 'Passwords não coincidem!';
      return;
    }

    // Verifica se o nome tem pelo menos 3 caracteres alfanuméricos
    if (name.length < 3) {
      this.feedback =
        'Username tem que ter no mínimo 3 caracteres alfanuméricos!';
      return;
    }

    // Verifica se o nome só contém caracteres alfanuméricos
    if (!name.match(/^[0-9a-zA-Z]+$/)) {
      this.feedback = 'Username só pode ter caracteres alfanuméricos!';
      return;
    }

    // Verifica se o usuário já existe
    this.userService.getUsers().subscribe((users: User[]) => {
      const existingUser = users.find((user) => user.username === name);
      if (existingUser) {
        this.feedback = 'Este utilizador já existe!';
      } else {
        // Verifica a complexidade da senha
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (pass.match(regex)) {
          this.authService.signup(name, pass).subscribe((user: User) => {
            this.currentUser = user;
            this.feedback = 'Registo efetuado com sucesso!';
            sessionStorage.setItem('currentUser', name);
            timer(2000).subscribe(() => {
              this.router.navigate([`/profile/${name}`]);
            });
          });
        } else {
          // Validação da senha
          this.feedback = '';
          if (!/(?=.*[a-z])/.test(pass)) {
            this.feedback +=
              'A senha precisa ter pelo menos uma letra minúscula.';
          }
          if (!/(?=.*[A-Z])/.test(pass)) {
            this.feedback +=
              'A senha precisa ter pelo menos uma letra maiúscula.';
          }
          if (!/(?=.*\d)/.test(pass)) {
            this.feedback += 'A senha precisa ter pelo menos um número.';
          }
          if (!/^[a-zA-Z\d]{8,}$/.test(pass)) {
            this.feedback +=
              'A senha precisa ter pelo menos 8 caracteres alfanuméricos.';
          }
        }
      }
    });
  }
}
