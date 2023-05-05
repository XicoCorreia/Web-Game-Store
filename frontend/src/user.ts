import { Item } from "./item";

export interface User {
  username: string;
  image: string;
  following: User[];
  followers: User[];
  library: Item[];
  wishlist: Item[];
}
