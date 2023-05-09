import { Review } from './review';

export interface Item {
  id: string;
  title: string;
  description: string;
  type: string;
  platform: string;
  price: number;
  cover: string;
  language: string[];
  reel: string[];
  video: string;
  stars: number;
  reviews: Review[];
}

export interface OwnedItem {
  item: Item;
  purchaseDate: Date;
}
