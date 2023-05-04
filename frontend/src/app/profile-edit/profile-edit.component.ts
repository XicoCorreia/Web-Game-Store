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
  user!: User;
  username = '';
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
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.username = username;
    this.userService
      .getUserByUsername(username)
      .subscribe((user) => (this.user = user));
  }

  goBack(): void {
    this.feedback = '';
  }

  onselectFile(event: Event) {
    const file = (<HTMLInputElement>event.target).files;
    if (file && file[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (event) => {
        this.user.image = event.target?.result as string;
      };
    }
  }

  save(): void {
    const input = document.getElementById('profile_name') as HTMLInputElement;
    const name = input.value;
    this.feedback = '';

    if (this.user) {
      if (name.length < 3) {
        this.feedback = 'Your name must have more than 3 characters!';
        return;
      }
      if (!name.match(/^[0-9a-zA-Z]+$/)) {
        this.feedback = 'Your name can only have numbers and letters!';
        return;
      }
      this.userService.getUserByUsername(name).subscribe((res) => {
        if (res.username) {
          this.feedback = 'Username already exists';
        }
        return;
      });

      if (this.feedback.length == 0) {
        this.userService
          .updateUser(this.user)
          .subscribe(() => (this.feedback = 'Changes applied with success'));
        const name = this.user.username;
        sessionStorage.setItem('currentUser', name);
        this.username = this.user.username;
      }
    }
  }
}
