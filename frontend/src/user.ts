export interface User {
    id: String;
    name: String;
    image?: String;
    following: String[];
    followers: String[];
    library: String[];
    wishlist: String[];
}