import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  defaultImage = '../../assets/profilePhoto.jpg';
  followers_button = 'Show followers';
  following_button = 'Show following';
  followers = false;
  following = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(id).subscribe((user) => (this.user = user));
  }

  showFollowing() {
    if (this.following) {
      this.following = false;
      this.following_button = 'Show following';
    } else {
      this.following = true;
      this.following_button = 'Hide following';
    }
  }

  showFollowers() {
    if (this.followers) {
      this.followers = false;
      this.followers_button = 'Show followers';
    } else {
      this.followers = true;
      this.followers_button = 'Hide followers';
    }
  }
}
