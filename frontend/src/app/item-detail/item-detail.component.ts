import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Item } from '../../item';
import { ItemService } from '../item.service';
import { Review } from 'src/review';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {

  item: Item | undefined;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemservice: ItemService
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemservice.getItem(id).subscribe((elem) => (this.item = elem));
  }

  createReview() {
    const inputDesc = document.getElementById('description') as HTMLInputElement;
    const description = inputDesc.value;
    const inputClas = document.getElementById('classification') as HTMLInputElement;
    const classification = parseInt(inputClas.value);
    const username = sessionStorage.getItem('currentUser');
    if(username != null){
      let review = {
        description: description,
        classification: classification,
        username: username
      } 
      this.item?.reviews.push(review);
      this.itemservice.updateReview(this.item!).subscribe();
    }
  }
}
