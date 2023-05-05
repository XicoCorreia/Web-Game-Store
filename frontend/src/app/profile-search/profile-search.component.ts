import { Component } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { User } from '../../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css'],
})
export class ProfileSearchComponent {
  users: User[] = [];
  userFormControl = new FormControl();
  filteredUsers!: Observable<User[]>;
  empty = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = this.userFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }
  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    const filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(filterValue)
    );
    this.empty = filteredUsers.length === 0;
    return filteredUsers;
  }
  goToUser(user: User): void {
    this.router.navigate([`/profile/${user.username}`]);
  }
}
