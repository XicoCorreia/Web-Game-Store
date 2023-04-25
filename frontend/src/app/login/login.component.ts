import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  currentUser: User = {} as User;

  constructor(private authService: AuthService) {}

  login(name: string, pass: string): void {
    this.currentUser = this.authService.login(name, pass);
  }
}
