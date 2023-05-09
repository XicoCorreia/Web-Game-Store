import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { AuthService } from '../auth.service';
import { Item } from 'src/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  username!: string;

  items: Item[] = [];
  constructor(
    private itemService: ItemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.authService.userSubject.subscribe(
      (user) => (this.username = user.username)
    );
  }

  getItems(): void {
    const count = 8;
    this.itemService.getItems().subscribe((data) => {
      for (let i = count; i < 16; i++) {
        if (i % 2 == 0) {
          this.items.push(data[i]);
        }
      }
    });
  }
}
