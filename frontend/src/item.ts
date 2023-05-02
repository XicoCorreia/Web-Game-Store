import { Review } from "./review";

export interface Item {
  id: number;
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
