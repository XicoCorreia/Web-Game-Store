import { Component } from '@angular/core';
import { LineItem } from '../line-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username = sessionStorage.getItem('currentUser') ?? '';
  cart = sessionStorage.getItem('cart') ?? new Map<string, LineItem>();
  title = 'G13 Gaming';

  ngDoCheck() {
    const newUsername = sessionStorage.getItem('currentUser') ?? '';
    if (this.username !== newUsername) {
      this.username = newUsername;
    }
  }

  ngOnDestroy(): void {
    sessionStorage.setItem('cart', JSON.stringify([...this.cart]));
  }

  ngOnInit(): void {
    //const cart = JSON.parse(sessionStorage.getItem('cart') ?? '[]');
    //this.cart = new Map(Object.entries(JSON.parse(sessionStorage.getItem('cart') ?? '[]')));
    this.username = sessionStorage.getItem('currentUser') ?? '';
  }
}
