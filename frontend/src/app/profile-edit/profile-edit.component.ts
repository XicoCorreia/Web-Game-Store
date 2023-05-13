import { Component, HostListener, Input, OnInit } from '@angular/core';
import { User } from '../../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  user!: User;
  @Input() username!: string;
  feedback = '';
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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username') || '';
      this.userService.currentUser$.subscribe((user) => {
        if (username === user.username) {
          this.user = user;
          this.selectedImage = user.image;
        }
      });
    });
  }

  goBack(): void {
    this.feedback = '';
  }

  async save(): Promise<void> {
    this.feedback = '';

    const payload = {
      image: this.selectedImage ?? this.user.image,
      username: this.username ?? this.user.username,
    } as User;

    if (this.user) {
      if (payload.username.length < 3) {
        this.feedback = 'Your name must have more than 3 characters!';
        return;
      }
      if (!payload.username.match(/^[0-9a-zA-Z]+$/)) {
        this.feedback = 'Your name can only have numbers and letters!';
        return;
      }

      const hasChanged = !this.isUnchanged();
      const usernameAvailable = !(await firstValueFrom(
        this.userService.usernameExists(payload.username)
      ));
      if (usernameAvailable || hasChanged) {
        this.userService
          .updateUser(this.user.username, payload)
          .subscribe((updatedUser) => {
            sessionStorage.setItem('currentUser', updatedUser.username);
            this.router.navigateByUrl(
              this.router.url.replace(this.user.username, payload.username)
            );
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
