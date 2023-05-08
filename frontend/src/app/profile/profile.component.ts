import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  sessionUser!: User;
  sessionUsername!: string;
  followersMsg = 'Show followers';
  followingMsg = 'Show following';
  followers = false;
  following = false;
  isfollowing = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getUser();
    this.sessionUsername = sessionStorage.getItem('currentUser') ?? '';
    this.userService.getUser(this.sessionUsername).subscribe((user) => {
      this.sessionUser = user;
      const isFollowing = this.sessionUser?.following.find(
        (followingUser) => followingUser.username === this.user.username
      );
      this.isfollowing = !!isFollowing;
    });
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.userService.getUser(username).subscribe((user) => (this.user = user));
  }

  showFollowing() {
    if (this.following) {
      this.following = false;
      this.followingMsg = 'Show following';
    } else {
      this.following = true;
      this.followingMsg = 'Hide following';
    }
  }

  showFollowers() {
    if (this.followers) {
      this.followers = false;
      this.followersMsg = 'Show followers';
    } else {
      this.followers = true;
      this.followersMsg = 'Hide followers';
    }
  }
  follow(usernameToFollow: string): void {
    this.userService
      .follow(this.sessionUsername, usernameToFollow)
      .subscribe({ error: console.error });
  }
}
