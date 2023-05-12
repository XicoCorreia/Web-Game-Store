import { Injectable } from '@angular/core';
import { Item } from '../item';
import { LineItem } from '../line-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart!: Map<string, LineItem>;
  currentCart$ = new Subject<Map<string, LineItem>>();

  loadCart(): void {
    this.cart = new Map(JSON.parse(sessionStorage.getItem('cart') ?? '[]'));
    this.currentCart$.next(this.cart);
  }

  saveCart(): void {
    sessionStorage.setItem('cart', JSON.stringify([...this.cart]));
    this.currentCart$.next(this.cart);
  }

  add(li: LineItem): void {
    li.count++;
    this.saveCart();
  }

  addItem(item: Item): void {
    const li = this.cart.get(item.id) ?? { item, count: 0 };
    li.count++;
    this.cart.set(item.id, li);
    this.saveCart();
  }

  get(): Map<string, LineItem> {
    return this.cart;
  }

  remove(li: LineItem): void {
    if (li.count > 1) {
      li.count--;
      this.cart.set(li.item.id, li);
    } else {
      this.cart.delete(li.item.id);
    }
    this.saveCart();
  }

  clear(): void {
    this.cart?.clear();
    this.saveCart();
  }

  getSubTotal(li: LineItem): number {
    return li.count * li.item.price;
  }

  getTotal = () =>
    [...this.cart.values()].reduce(
      (acc, li) => acc + li.count * li.item.price,
      0
    );

  contains(item: Item) {
    return this.cart.has(item.id);
  }
}
