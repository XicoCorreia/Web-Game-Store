import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Item } from '../../item';
import { ItemService } from '../item.service';
import { Review } from 'src/review';
import { User } from 'src/user';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  item: Item | undefined;
  username = '';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemservice: ItemService
  ) {}

  ngOnInit(): void {
    this.getItem();
    this.username =
      sessionStorage.getItem('currentUser') == null
        ? ''
        : sessionStorage.getItem('currentUser')!;
    console.log(this.username);
    console.log(sessionStorage.getItem('currentUser'));
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

    if (this.username.length != 0) {
      const review = {
        description: description,
        classification: classification,
        username: this.username,
        like: 0,
      };
      this.item?.reviews.push(review);
      this.itemservice.updateReview(this.item!).subscribe();
      inputDesc.value = '';
    }
  }

  like(review: Review) {
    review.like++;
    this.itemservice.updateReview(this.item!).subscribe();
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
