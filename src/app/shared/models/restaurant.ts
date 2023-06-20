import { Review } from './review';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  imgUrl: string;
  reviews: Review[];
}
