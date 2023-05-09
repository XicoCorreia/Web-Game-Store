import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit {
  following!: User[];
  user!: User;
  showNoFollowingMessage = false;
  loading = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.userService.getUser(username).subscribe((user) => {
      this.user = user;

      this.getFollowing(user.username);
    });
  }
  getFollowing(username: string): void {
    this.userService.getFollowing(username).subscribe((following: User[]) => {
      this.following = following;
      setTimeout(() => {
        this.showNoFollowingMessage = this.following.length === 0;
      }, 50);
      this.loading = false;
    });
  }
}
