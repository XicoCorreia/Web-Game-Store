import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  user: User | undefined;
  feedback = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.userService
      .getUserByUsername(username)
      .subscribe((user) => (this.user = user));
  }

  goBack(): void {
    this.feedback = '';
    this.location.back();
  }

  save(): void {
    const input = document.getElementById('profile_name') as HTMLInputElement;
    const name = input.value;
    this.feedback = '';

    if (this.user) {
      if (name.length < 3) {
        this.feedback = 'Your name should has more than 3 characters!';
        return;
      }
      if (!name.match(/^[0-9a-zA-Z]+$/)) {
        this.feedback = 'Your name should only has numbers and letters!';
        return;
      }
      this.userService.checkUsername(name).subscribe((res) => {
        if (res.hasOwnProperty('username')) {
          this.feedback = 'Username already exists';
        }
      });

      if (this.feedback == '') {
        this.feedback = 'Changes applied with success';
        this.userService.updateUser(this.user).subscribe(() => {});
      }
    }
  }
}
