import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { Item } from '../item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.itemsUrl}/${id}`).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  /**
   * Search for Items whose name contains the search term.
   *
   * @param term The search term.
   * @returns An observable of an array of Items.
   */
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty Item array.
      return of([]);
    }
    const url = `${this.itemsUrl}?title=${term}`;

    return this.http.get<Item[]>(url).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }
}
