import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/item';
import { User } from 'src/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {
  orderBy = 'title';
  userName = '';
  user: User | undefined;
  itemList: Item[] = [];
  userList: User[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  //route=/list/username/listname
  ngOnInit(): void {
    this.userName = String(this.route.snapshot.paramMap.get('username'));
    this.getUser(this.userName);
  }

  getUser(name: string): void {
    this.userService.getUser(name).subscribe((elem) => {
      this.user = elem;
      this.user.library.sort((a, b) =>
        a.item.title > b.item.title ? 1 : b.item.title > a.item.title ? -1 : 0
      );
    });
  }

  onChange() {
    if (this.user !== undefined) {
      if (this.orderBy === 'title')
        this.user.library.sort((a, b) =>
          a.item.title > b.item.title ? 1 : b.item.title > a.item.title ? -1 : 0
        );
      else
        this.user.library.sort((a, b) =>
          a.purchaseDate > b.purchaseDate
            ? 1
            : b.purchaseDate > a.purchaseDate
            ? -1
            : 0
        );
    }
  }
}
