export interface User {
  id: string;
  username: string;
  password: string;
  image: string;
  following: User[];
  followers: User[];
  library: string[];
  wishlist: string[];
}
