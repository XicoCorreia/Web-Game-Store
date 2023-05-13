import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../item';
import { ItemService } from '../item.service';
import { Review } from 'src/review';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { CartService } from '../cart.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  private snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
  };

  isLoggedIn = false;
  user!: User;
  message = '';
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {
    this.cartService.loadCart();
  }

  ngOnInit(): void {
    this.getItem();
    this.userService.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user?.username;
    });
  }

  addToWishlist(): void {
    if (!this.isInWishlist()) {
      this.userService
        .addItemsToWishlist(this.user?.username, [this.item?.id])
        .subscribe(() => {
          this.message = 'Item added to wishlist';
          this.snackBar.open(this.message, 'Close', this.snackBarConfig);
        });
    } else {
      this.message = 'Item already in wishlist';
      this.snackBar.open(this.message, 'Close', this.snackBarConfig);
    }
  }

  isInWishlist(): boolean {
    return !!this.user?.wishlist?.find((x) => x.id === this.item.id);
  }

  isInLibrary(): boolean {
    return !!this.user?.library?.find((x) => x.item?.id === this.item.id);
  }

  isInCart() {
    return this.cartService.contains(this.item);
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
        author: this.user.username,
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
      review.likes.push(this.user.username);
      this.itemService.updateReview(this.item).subscribe();
    }
  }

  userAlreadyLikes(review: Review) {
    return !!review.likes.find((u) => u === this.user.username); // this works because usernames can't be nullish
  }

  userAlreadyVoted() {
    return !!this.item.reviews.find((r) => r.author === this.user.username);
  }

  showComment(review: Review) {
    const inputDesc = document.getElementById(
      'comment-' + review.author
    ) as HTMLInputElement;
    if (inputDesc.style.display !== 'none') {
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
    review.comments.push(this.user.username + ' : ' + comment);
    this.itemService.updateReview(this.item).subscribe();
  }

  addToCart(el: MatButton) {
    const prevState = el.disabled;
    el.disabled = true;
    if (!this.isInLibrary() && this.item.price !== 0) {
      this.cartService.addItem(this.item);
      this.message = 'Item added to cart!';
    } else {
      this.message =
        this.item.price !== 0
          ? 'Item already in library.'
          : 'Item is free-to-play.';
    }
    setTimeout(() => (el.disabled = prevState), 1000);
    this.snackBar.open(this.message, 'Close', this.snackBarConfig);
  }

  addToLibrary(el: MatButton) {
    const libraryUrl = `${this.user.username}/library`;
    el.disabled = true;
    if (!this.isInLibrary()) {
      this.userService
        .addItemsToLibrary(this.user.username, [this.item.id])
        .subscribe(() => {
          this.message = 'Item added to library!';
          this.snackBar
            .open(this.message, 'Go to library')
            .onAction()
            .subscribe(() => this.router.navigateByUrl(libraryUrl));
        });
    } else {
      this.message = 'Item already in library.';
      this.snackBar.open(this.message, 'Close', this.snackBarConfig);
    }
  }

  getLibraryButtonLabel(): string {
    if (this.isInLibrary()) {
      return 'Already in library';
    }
    const prefix = this.isLoggedIn ? 'Add to ' : 'Login to add to ';
    const suffix = this.item.price === 0 ? 'library' : 'cart';
    return prefix + suffix;
  }

  getWishlistButtonLabel(): string {
    if (this.isLoggedIn) {
      if (this.isInLibrary()) {
        return 'Already in library';
      }
      if (this.isInWishlist()) {
        return 'Already in wishlist';
      }
    }
    return 'Add to wishlist';
  }
}
