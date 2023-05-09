import { Item, OwnedItem } from './item';

export interface User {
  username: string;
  image: string;
  following: User[];
  followers: User[];
  library: OwnedItem[];
  wishlist: Item[];
}
