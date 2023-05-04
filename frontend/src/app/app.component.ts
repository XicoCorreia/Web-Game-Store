import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username = sessionStorage.getItem('currentUser') ?? '';
  title = 'G13 Gaming';

  ngDoCheck() {
    const newUsername = sessionStorage.getItem('currentUser') ?? '';
    if (this.username !== newUsername) {
      this.username = newUsername;
    }
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('currentUser') ?? '';
  }
}
