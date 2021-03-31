import { Pagination } from './pagination';
import { Item } from '@/types';

export interface ItemPage {
  items: Item[];
  pagination: Pagination;
}

export interface ItemDTO {
  id?: string;
  name: string;
  description?: string;
  image?: string;
}
