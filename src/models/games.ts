export interface Games {
  id: number;
  title: string;
  producer: string;
  genre: string;
  rating: number;
  image_path: string;
}

export interface GameRating {
  user_nickname: string;
  user_name: string;
  comment: string;
  rating: number;
}
