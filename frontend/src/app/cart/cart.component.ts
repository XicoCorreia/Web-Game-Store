import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { Item } from '../../item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items!: Item[];

  private iconMap: { [key: string]: string } = {
    game: 'sports_esports',
    subscription: 'subscriptions',
    dlc: 'download_for_offline',
  };

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService
  ) {}

  getIcon(itemType: string) {
    return this.iconMap[itemType];
  }

  ngOnInit(): void {
    // TODO: store cart items in sessionStorage
    this.itemService.getItems().subscribe((items) => {
      this.items = items.filter((item) => item.price > 0).slice(0, 6);
    });
  }
}
