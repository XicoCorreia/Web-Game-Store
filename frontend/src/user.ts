export interface User {
  username: string;
  image: string;
  following: User[];
  followers: User[];
  library: string[];
  wishlist: string[];
}
