import { Errors, ItemPage, Filter, SortingFilter } from './dtos';
import { Item } from '@/types';

export interface ItemService {
  Create(item: Item): Promise<void | Errors.Unexpected>;
  GetItemsByCatalogue(
    catalogueID: string,
    filter: Filter,
    page: number,
    max?: number,
    sortBy?: SortingFilter
  ): Promise<ItemPage | Errors.Unexpected>;
}
