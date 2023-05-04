import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/user';
import { Item } from 'src/item';
import { UserService } from '../user.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  userName = '';
  user: User | undefined;
  listName = '';
  itemList: Item[] = [];

  constructor(
    private userService: UserService,
    itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('username') ?? '';
    this.listName = this.route.snapshot.paramMap.get('listname') ?? '';
    this.getUser(this.userName);
    if (this.listName === 'wishlist') {
      this.getWishlist(this.userName);
    }
  }

  getWishlist(name: string): void {
    this.userService.getWishlist(name).subscribe((data) => {
      this.itemList = data;
    });
  }

  getUser(name: string): void {
    this.userService.getUserByUsername(name).subscribe((elem) => {
      this.user = elem;
    });
  }
}
