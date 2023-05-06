import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { LineItem } from '../../line-item';
import { animate, style, transition, trigger } from '@angular/animations';
import { Title } from '@angular/platform-browser';

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
export class CartComponent implements OnInit, OnDestroy {
  @Input() lineItems!: Set<LineItem>;
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
    private route: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService,
    private titleService: Title
  ) {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle(this.previousTitle + ' - Cart');
  }

  ngOnInit(): void {
    // TODO: store cart items in sessionStorage
    this.itemService.getItems().subscribe((items) => {
      this.lineItems = new Set(
        items
          .filter((item) => item.price > 0)
          .map((item) => {
            return { item, count: ~~(Math.random() * 5) + 1 };
          })
          .slice(0, 6)
      );
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.previousTitle);
  }

  getIcon(itemType: string) {
    return this.iconMap[itemType]['icon'];
  }

  getLabel(itemType: string) {
    return this.iconMap[itemType]['label'];
  }

  getSubTotal(li: LineItem): number {
    return li.count * li.item.price;
  }

  add(li: LineItem) {
    li.count++;
  }

  remove(li: LineItem) {
    if (li.count > 1) {
      li.count--;
    } else {
      this.lineItems.delete(li);
    }
  }

  sum = () =>
    [...this.lineItems].reduce((acc, li) => acc + li.count * li.item.price, 0);
}
