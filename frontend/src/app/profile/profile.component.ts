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
  user: User | undefined;
  currentUser: string | null | undefined;
  followers_b = 'Show followers';
  following_b = 'Show following';
  followers = false;
  following = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getUser();
    this.currentUser = sessionStorage.getItem('currentUser');

    console.log(this.currentUser);
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.userService
      .getUserByUsername(username)
      .subscribe((user) => (this.user = user));
  }

  showFollowing() {
    if (this.following) {
      this.following = false;
      this.following_b = 'Show following';
    } else {
      this.following = true;
      this.following_b = 'Hide following';
    }
  }

  showFollowers() {
    if (this.followers) {
      this.followers = false;
      this.followers_b = 'Show followers';
    } else {
      this.followers = true;
      this.followers_b = 'Hide followers';
    }
  }
  follow(username: string): void {
    this.userService.follow(this.currentUser!, username).subscribe(
      (response) => {
        console.log(response); // log da resposta do backend
      },
      (error) => {
        console.error(error); // log do erro detalhado
      }
    );
  }
}
