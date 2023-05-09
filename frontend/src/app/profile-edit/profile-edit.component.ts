import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  user!: User;
  username!: string;
  feedback = '';
  userExists!: boolean;
  selectedImage!: string;
  profilePictures = {
    dog: 'https://fc55955.blob.core.windows.net/psi013/dog.jpg',
    cat: 'https://fc55955.blob.core.windows.net/psi013/cat.jpg',
    gamer: 'https://fc55955.blob.core.windows.net/psi013/gamer.jpg',
    default: 'https://fc55955.blob.core.windows.net/psi013/default.webp',
  };

  sleep = (ms: number | undefined) => new Promise((r) => setTimeout(r, ms));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.username = username;
    this.userService.getUser(username).subscribe((user) => {
      this.user = user;
      this.selectedImage = this.user?.image;
    });
  }

  goBack(): void {
    this.feedback = '';
  }

  async save(): Promise<void> {
    this.feedback = '';

    const updatedUser = {
      ...this.user,
      image: this.selectedImage,
      username: this.username,
    };

    if (this.user) {
      if (updatedUser.username.length < 3) {
        this.feedback = 'Your name must have more than 3 characters!';
        return;
      }
      if (!updatedUser.username.match(/^[0-9a-zA-Z]+$/)) {
        this.feedback = 'Your name can only have numbers and letters!';
        return;
      }

      const hasChanged = !this.isUnchanged();
      const usernameAvailable = !(await firstValueFrom(
        this.userService.usernameExists(updatedUser.username)
      ));
      if (usernameAvailable || hasChanged) {
        this.userService
          .updateUser(this.user.username, updatedUser)
          .subscribe(() => {
            sessionStorage.setItem('currentUser', updatedUser.username);
            this.router.navigateByUrl(
              this.router.url.replace(this.user.username, updatedUser.username)
            );
            this.user = updatedUser;
            this.feedback = 'Changes applied with success';
          });
      } else {
        this.feedback = 'Username already exists';
      }
    }
  }

  isUnchanged(): boolean {
    return (
      this.user.username === this.username &&
      this.user.image === this.selectedImage
    );
  }

  @HostListener('keydown', ['$event'])
  onKeyDown($event: KeyboardEvent, el: HTMLImageElement) {
    if ($event.key === 'Enter' && el) {
      this.selectedImage = el.src;
    }
  }
}
