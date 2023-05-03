import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Item } from '../../item';
import { ItemService } from '../item.service';
import { Review } from 'src/review';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  username = String(sessionStorage.getItem('currentUser')!);
  message = '';

  item: Item | undefined;
  constructor(
    private route: ActivatedRoute,
    private itemservice: ItemService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  ngDoCheck() {
    const curr = sessionStorage.getItem('currentUser')!;
    if (this.username != curr) {
      this.username = curr;
    }
  }

  addToWishlist(name: string, title: string): void {
    this.userService.addItemToWishlist(name, title).subscribe((data) => {
      if (data.wishlist.includes(title)) {
        this.message = 'Item added to wishlist';
      } else {
        this.message = 'Error adding item';
      }
    });
  }

  getItem() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemservice.getItem(id).subscribe((elem) => (this.item = elem));
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

    if (this.username != null) {
      const review = {
        description: description,
        classification: classification,
        username: this.username,
        like: 0,
        userLiked: [],
      };
      this.item?.reviews.push(review);
      this.itemservice.updateReview(this.item!).subscribe();
      inputDesc.value = '';
    }
  }

  like(review: Review) {
    if (!this.userAlreadyLike(review)) {
      review.like++;
      review.userLiked.push(this.username);
      this.itemservice.updateReview(this.item!).subscribe();
    }
  }

  userAlreadyLike(review: Review) {
    const userLikes = review.userLiked;
    const user = this.username;
    let already = false;
    userLikes?.forEach(function (value) {
      if (value == user) {
        already = true;
      }
    });
    return already;
  }

  userAlreadyVoted() {
    const reviews = this.item?.reviews;
    const user = this.username;
    let already = false;
    reviews?.forEach(function (value) {
      if (value.username == user) {
        already = true;
      }
    });
    return already;
  }
}
