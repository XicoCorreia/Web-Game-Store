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
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(id).subscribe((user) => (this.user = user));
  }

  goBack(): void {
    this.feedback = '';
    this.location.back();
  }

  save(): void {
    const input = document.getElementById('input') as HTMLInputElement;
    const name = input.value;
    this.feedback = '';

    if (this.user) {
      if (!name.match(/^[0-9a-z]+$/)) {
        this.feedback = 'Your name should only has numbers and letters!';
        return;
      }

      this.userService.checkUsername(name).subscribe((res) => {
        if (res.toString.length > 0) {
          this.feedback = 'Username already exists';
        }
      });

      if (this.feedback == '') {
        this.userService.updateUser(this.user);
        this.feedback = 'Changes applied with success';
      }
    }
  }
}
