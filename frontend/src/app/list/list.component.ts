import { Component } from '@angular/core';
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
export class ListComponent {
  userName = '';
  user: User | undefined;
  listName = '';
  itemList: Item[] = [];
  userList: User[] = [];

  constructor(
    private userService: UserService,
    itemService: ItemService,
    private route: ActivatedRoute
  ) {}

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
}
