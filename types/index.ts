export interface Anime {
  id: string;
  title: string;
  titleKo: string;
  imageUrl: string;
  rating: number;
  description?: string;
  descriptionKo?: string;
  genre?: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
}
