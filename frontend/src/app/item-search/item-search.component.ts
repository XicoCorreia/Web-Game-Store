import { Component } from '@angular/core';

import { Item } from '../../item';
import { ItemService } from '../item.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';

/**
 * The ItemSearchComponent class is responsible for handling the search bar.
 *
 * It is responsible for:
 * - Handling the search bar input.
 * - Sending the search term to the ItemService.
 * - Displaying the search results.
 */
@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css'],
})
export class ItemSearchComponent {
  items$!: Observable<Item[]>;
  private searchTerms = new Subject<string>();

  constructor(private itemService: ItemService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.items$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) =>
        term.length >= 3 ? this.itemService.searchItems(term) : of([])
      )
    );
  }
}
