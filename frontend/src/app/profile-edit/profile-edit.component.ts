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
  userExists!: boolean;
  sleep = (ms: number | undefined) => new Promise((r) => setTimeout(r, ms));

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
    this.userService.getUser(username).subscribe((user) => (this.user = user));
  }

  goBack(): void {
    this.feedback = '';
  }

  onSelectFile(event: Event) {
    const file = (<HTMLInputElement>event.target).files;
    if (file && file[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (event) => {
        this.user.image = event.target?.result as string;
      };
    }
  }

  async save(): Promise<void> {
    const input = document.getElementById('profile_name') as HTMLInputElement;
    const username = input.value;
    this.feedback = '';

    if (this.user) {
      if (username.length < 3) {
        this.feedback = 'Your name must have more than 3 characters!';
        return;
      }
      if (!username.match(/^[0-9a-zA-Z]+$/)) {
        this.feedback = 'Your name can only have numbers and letters!';
        return;
      }

      this.usernameExists(username);
      await this.sleep(400);

      if (!this.userExists) {
        this.userService
          .updateUser(this.username, this.user)
          .subscribe(() => (this.feedback = 'Changes applied with success'));
        this.username = this.user.username;
        sessionStorage.setItem('currentUser', this.user.username);
      } else {
        this.feedback = 'Username already exists';
      }
    }
  }

  usernameExists(username: string): void {
    const exists = this.userService.usernameExists(username);
    exists.subscribe((res) => {
      if (res) this.userExists = true;
      else this.userExists = false;
    });
  }
}
