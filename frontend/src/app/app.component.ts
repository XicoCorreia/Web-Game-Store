import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username!: string;
  itemsInCart = 0;
  title = 'G13 Gaming';
  shouldDisplayBurgerMenu$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.userService.currentUser$.subscribe(
      (user) => (this.username = user?.username)
    );
    this.cartService.currentCart$.subscribe((cart) => {
      const listItems = Array.from(cart.values());
      this.itemsInCart = listItems.reduce((acc, li) => acc + li.count, 0);
    });

    this.shouldDisplayBurgerMenu$ = this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(map((state) => state.matches));
  }

  logout(): void {
    this.authService.logout();
    this.cartService.clear();
    this.router.navigateByUrl('/dashboard');
  }
}
