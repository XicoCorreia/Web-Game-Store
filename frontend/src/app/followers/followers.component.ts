import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent implements OnInit {
  followers!: User[];
  user!: User;
  showNoFollowersMessage = false;

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
      this.getFollowers(user.username);
    });
  }

  getFollowers(username: string): void {
    this.userService.getFollowers(username).subscribe((followers: User[]) => {
      this.followers = followers;
      setTimeout(() => {
        this.showNoFollowersMessage = this.followers.length === 0;
      }, 100);
    });
  }
}
