import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../item';
import { ItemService } from '../item.service';
import { Review } from 'src/review';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements DoCheck, OnInit {
  user!: User;
  username: string = sessionStorage.getItem('currentUser') ?? '';
  message = '';
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getItem();
    this.userService
      .getUserByUsername(this.username)
      .subscribe((user) => (this.user = user));
  }

  ngDoCheck() {
    const newUsername = sessionStorage.getItem('currentUser') ?? '';
    if (this.username !== newUsername) {
      this.username = newUsername;
    }
  }

  addToWishlist(name: string, title: string): void {
    this.userService.addItemToWishlist(name, title).subscribe((data) => {
      console.log(data);
      if (data?.wishlist?.includes(title)) {
        this.message = 'Item added to wishlist';
      }
    });
    if (this.message.length == 0) {
      this.message = 'Error adding item';
    }
  }

  getItem() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.itemService.getItem(id).subscribe((elem) => (this.item = elem));
  }

  createReview() {
    const inputDesc = document.getElementById(
      'description'
    ) as HTMLInputElement;
    const description = inputDesc.value.length == 0 ? '-' : inputDesc.value;
    const inputClas = document.getElementById(
      'classification'
    ) as HTMLInputElement;
    const classification = parseInt(inputClas.value);

    if (this.userAlreadyVoted()) {
      return;
    }

    if (this.user) {
      const review: Review = {
        description: description,
        classification: classification,
        author: this.username,
        likes: [],
        comments: [],
      };
      this.item.reviews.push(review);
      this.itemService.updateReview(this.item).subscribe();
      inputDesc.value = '';
    }
  }

  like(review: Review) {
    if (!this.userAlreadyLikes(review)) {
      review.likes.push(this.username);
      this.itemService.updateReview(this.item).subscribe();
    }
  }

  userAlreadyLikes(review: Review) {
    return !!review.likes.find((u) => u === this.username); // this works because usernames can't be nullish
  }

  userAlreadyVoted() {
    return !!this.item.reviews.find((r) => r.author === this.username);
  }

  showComment(review: Review) {
    const inputDesc = document.getElementById(
      'comment-' + review.author
    ) as HTMLInputElement;
    if (inputDesc.style.display != 'none') {
      inputDesc.style.display = 'none';
    } else {
      inputDesc.style.display = 'block';
    }
  }

  addComment(review: Review) {
    const inputDesc = document.getElementById(
      'comment-area-' + review.author
    ) as HTMLInputElement;
    const comment = inputDesc.value;
    review.comments.push(this.username + ' : ' + comment);
    this.itemService.updateReview(this.item).subscribe();
  }
}
