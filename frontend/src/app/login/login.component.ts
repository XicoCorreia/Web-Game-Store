import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  feedback = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(name: string, pass: string): void {
    if (name !== '' && pass !== '') {
      this.isLoading = true;
      this.authService
        .login(name, pass)
        .pipe(
          catchError((err) => {
            this.isLoading = false;
            this.feedback = 'Login falhou! Tente novamente.';
            throw err;
          })
        )
        .subscribe((user: User) => {
          console.info(user.username, 'signed in successfully.');
          this.isLoading = false;
          this.feedback = 'Login efetuado com sucesso!';
          this.router.navigate(['/dashboard']);
        });
    }
  }
}
