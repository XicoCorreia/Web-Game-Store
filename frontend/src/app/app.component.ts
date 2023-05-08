import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username!: string;
  title = 'G13 Gaming';

  constructor(private authService: AuthService) {
    this.authService.userSubject.subscribe(
      (user) => (this.username = user?.username)
    );
  }
}
