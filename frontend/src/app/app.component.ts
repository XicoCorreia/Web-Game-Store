import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username = String(sessionStorage.getItem('currentUser')!);
  title = 'G13 Gaming';

  ngDoCheck() {
    const curr = String(sessionStorage.getItem('currentUser')!);
    if (this.username != curr) {
      this.username = curr;
    }
  }

  ngOnInit(): void {
    const name = sessionStorage.getItem('currentUser');
    if (name != null) {
      this.username = name;
    }
  }
}
