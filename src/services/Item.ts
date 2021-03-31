import { Errors, ItemPage, Filter } from './dtos';
import { Item } from '@/types';

export interface ItemService {
  Create(item: Item): Promise<void | Errors.Unexpected>;
  GetItemsByCatalogue(
    catalogueID: string,
    filter: Filter,
    page: number,
    max?: number
  ): Promise<ItemPage | Errors.Unexpected>;
}
