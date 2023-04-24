export interface User {
  id: string;
  name: string;
  image?: string;
  following: User[];
  followers: User[];
  library: string[];
  wishlist: string[];
}
