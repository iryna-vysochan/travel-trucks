export type CamperGalleryItem = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};

export type Review = {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
};

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  gallery: CamperGalleryItem[];
  reviews: Review[];
  totalReviews: number;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
};

export type CampersResponse = {
  items: Camper[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};
