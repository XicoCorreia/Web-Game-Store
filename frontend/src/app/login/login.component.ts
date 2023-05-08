import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  currentUser: User = {} as User;
  feedback = '';
  isloading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(name: string, pass: string): void {
    if (name !== '' && pass !== '') {
      this.isloading = true;
      this.authService.login(name, pass).subscribe((user: User) => {
        if (user !== null) {
          this.currentUser = user;
          this.feedback = 'Login efetuado com sucesso!';
          const name = user.username;
          sessionStorage.setItem('currentUser', name);
          this.router.navigate(['/dashboard']);
        }
      });
    }
    setTimeout(() => {
      this.isloading = false;
      this.feedback = 'Login falhou! Tente novamente.';
    }, 2000);
  }
}
