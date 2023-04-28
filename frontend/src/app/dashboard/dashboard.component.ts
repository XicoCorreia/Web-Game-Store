import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { AuthService } from '../auth.service';
import { User } from 'src/user';
import { Item } from 'src/item';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  username:String ="";

  items: Item[] = [];
  constructor(private itemService:ItemService,private authService:AuthService){}

  ngOnInit(): void {
    this.getItems();
    const name=sessionStorage.getItem('currentUser');
    if(name!=null){
      this.username=name;
    }
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

  canActivate(): Boolean{
    return this.authService.canActivate();
  }

}

