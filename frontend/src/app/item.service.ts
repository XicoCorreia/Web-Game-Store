import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';

import { catchError, Observable, of, pipe, tap } from 'rxjs';

import {Item} from '../item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl='http://127.0.0.1:3000/items';
  constructor(private http: HttpClient) {}

  getItems():Observable<Item[]>{
    return this.http.get<Item[]>(this.itemsUrl).pipe(catchError(err=>{console.log(err);return of()}));
  }

  getItem(id:number):Observable<Item>{
    return this.http.get<Item>(`${this.itemsUrl}/${id}`).pipe(catchError(err=>{console.log(err);return of()}))
  }

}
