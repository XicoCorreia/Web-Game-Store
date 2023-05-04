import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { Item } from '../item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsUrl = 'http://localhost:3000/items';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.itemsUrl}/${id}`).pipe(
      catchError((err) => {
        console.error(err);
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
        console.error(err);
        return of();
      })
    );
  }

  updateReview(item: Item): Observable<object> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.put(url, item, this.httpOptions).pipe(
      catchError((err) => {
        console.error(err);
        return of();
      })
    );
  }
}
