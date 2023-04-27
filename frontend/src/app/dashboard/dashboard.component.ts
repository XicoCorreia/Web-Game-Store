import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from 'src/item';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  username = sessionStorage.getItem('currentUser')!;

  items: Item[] = [];
  constructor(private itemService:ItemService){}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    var count=8;
    this.itemService.getItems().subscribe((data) =>{
      for (let i =count;i<16;i++){
        if(i%2==0){
          this.items.push(data[i]);
        }
      }
    });
  }

}

