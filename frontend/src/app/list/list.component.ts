import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { User } from 'src/user';
import { Item } from 'src/item';
import { UserService } from '../user.service';
import { ItemService } from '../item.service';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  userName = '';
  user: User | undefined;
  listName = '';
  sessionUser: User | undefined;
  private snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
  };

  constructor(
    private userService: UserService,
    itemService: ItemService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    
  ) {
    this.authService.userSubject.subscribe(
      (sessionUser) => (this.sessionUser = sessionUser)
    );
  }

  //route=/list/username/listname
  ngOnInit(): void {
    this.userName = String(this.route.snapshot.paramMap.get('username'));
    this.listName = String(this.route.snapshot.paramMap.get('listname'));
    this.getUser(this.userName);
  }

  getUser(name: string): void {
    this.userService.getUser(name).subscribe((elem) => {
      this.user = elem;
    });
  }

  removeItemFromWishlist(item: Item): void {
    if (!this.user) {
      return;
    }
    const updatedWishlist = this.user.wishlist.filter((i) => i.id !== item.id);
    this.userService.removeItemsFromWishlist(this.user.username, [item.id])
      .subscribe((user) => {
        this.user = user;
        this.user.wishlist = updatedWishlist;
      });
    this.snackBar.open("Item removed from wishlist", 'Close', this.snackBarConfig);
      
  }
  
}
