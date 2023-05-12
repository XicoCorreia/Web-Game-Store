import { Component, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { LineItem } from '../../line-item';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, height: '0' }),
        animate('200ms', style({ height: '*' })),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('100ms', style({ opacity: 0 })),
        animate('200ms', style({ height: '0' })),
      ]),
    ]),
  ],
})
export class CartComponent implements OnDestroy {
  isLoggedIn = false;
  cart!: LineItem[];

  private previousTitle!: string;
  private iconMap: { [key: string]: { [key: string]: string } } = {
    game: {
      icon: 'sports_esports',
      label: 'Game',
    },
    subscription: {
      icon: 'subscriptions',
      label: 'Subscription',
    },
    dlc: {
      icon: 'download_for_offline',
      label: 'DLC',
    },
  };

  constructor(
    private cartService: CartService,
    private titleService: Title,
    private userService: UserService
  ) {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle(this.previousTitle + ' - Cart');
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(
      (user) => (this.isLoggedIn = !!user?.username)
    );
    this.cartService.currentCart$.subscribe(
      (cart) => (this.cart = [...cart.values()])
    );
    this.cartService.loadCart();
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.previousTitle);
  }

  getIcon(itemType: string): string {
    return this.iconMap[itemType]['icon'];
  }

  getLabel(itemType: string): string {
    return this.iconMap[itemType]['label'];
  }

  add(li: LineItem) {
    this.cartService.add(li);
  }

  remove(li: LineItem) {
    this.cartService.remove(li);
  }

  getSubTotal(li: LineItem) {
    return this.cartService.getSubTotal(li);
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
