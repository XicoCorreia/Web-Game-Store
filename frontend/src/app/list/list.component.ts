import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/item';
import { User } from 'src/user';
import { UserService } from '../user.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  userName : String ="";
  user : User | undefined;
  listName : String = "";

  constructor(private userService:UserService,itemService:ItemService,private route: ActivatedRoute){}

  //route=/list/username/listname
  ngOnInit():void{
    this.userName=String(this.route.snapshot.paramMap.get('username'));
    this.listName=String(this.route.snapshot.paramMap.get('listname'));
    this.getUser(this.userName);
  }

  getUser(name:String):void{
    this.userService.getUserByUsername(name).subscribe(elem=>{
      this.user=elem;
    });
  }

}