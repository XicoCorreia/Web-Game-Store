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
  username= String(sessionStorage.getItem('currentUser')!);
  message="";

  item: Item | undefined;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemservice: ItemService,
    private userService:UserService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  ngDoCheck() {
    const curr = String(sessionStorage.getItem('currentUser')!);
    if (this.username != curr) {
      this.username = curr;
    }
  }

  addToWishlist(name:string,title:string):void{
    this.userService.addItemToWishlist(name,title).subscribe((data)=>{
      if(data.wishlist.includes(title)){
        this.message='Item added to wishlist';
      }else{
        this.message='Error adding item';
      }
    });
  }

  getItem() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemservice.getItem(id).subscribe((elem) => (this.item = elem));
  }

  createReview() {
    const inputDesc = document.getElementById('description') as HTMLInputElement;
    const description = inputDesc.value.length == 0? "-": inputDesc.value;
    const inputClas = document.getElementById('classification') as HTMLInputElement;
    const classification = parseInt(inputClas.value);
    const username = sessionStorage.getItem('currentUser');

    if(username != null){
      const review = {
        description: description,
        classification: classification,
        username: username
      } 
      this.item?.reviews.push(review);
      this.itemservice.updateReview(this.item!).subscribe();
      inputDesc.value = '';
    }

  }

}
