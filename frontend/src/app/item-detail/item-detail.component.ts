import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Item } from '../../item';
import { ItemService } from '../item.service';

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
}
