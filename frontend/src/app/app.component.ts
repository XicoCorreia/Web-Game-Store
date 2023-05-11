// @ts-ignore
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username!: string;
  itemsInCart = 0;
  title = 'G13 Gaming';
  shouldDisplayBurgerMenu = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.userSubject.subscribe(
      (user) => (this.username = user?.username)
    );
    this.cartService.cartSubject.subscribe((cart) => {
      const listItems = Array.from(cart.values());
      this.itemsInCart = listItems.reduce((acc, li) => acc + li.count, 0);
    });

    let shouldDisplayBurgerMenu = false;

    window.addEventListener('resize', function (event) {
      if (window.innerWidth < 600) {
        shouldDisplayBurgerMenu = true;
      } else {
        shouldDisplayBurgerMenu = false;
      }
      console.log(shouldDisplayBurgerMenu);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
