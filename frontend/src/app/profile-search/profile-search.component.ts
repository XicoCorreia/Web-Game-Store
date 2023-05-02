import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent {
  currentUser: User = {} as User;
  hasResults = true;

  private searchTerms = new Subject<string>();


  constructor(private userService: UserService, private router: Router) {}

  search(term: string): void {
    this.userService.searchUser(term).subscribe((user: User) => {
      this.currentUser = user;
      this.router.navigate([`/profile/${term}`]);
    });
  }
}
