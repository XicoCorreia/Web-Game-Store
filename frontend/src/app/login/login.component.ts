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
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(name: string, pass: string): void {
    if (name !== '' && pass !== '') {
      this.isLoading = true;
      this.authService.login(name, pass).subscribe((user: User) => {
        this.isLoading = false;
        if (user) {
          this.feedback = 'Login efetuado com sucesso!';
          this.router.navigate(['/dashboard']);
        } else {
          this.feedback = 'Login falhou! Tente novamente.';
        }
      });
    }
  }
}
