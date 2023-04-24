export interface User {
  id: string;
  name: string;
  image?: string;
  following: string[];
  followers: string[];
  library: string[];
  wishlist: string[];
}
