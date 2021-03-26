import { Item } from './Item';

export type Catalogue = {
  id: string;
  name: string;
  description?: string;
  items: Item[];
};
