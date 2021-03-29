import { Errors, ItemPage, ItemFilter } from './dtos';

export interface ItemService {
  GetItems(
    filter: ItemFilter,
    page: number,
    max?: number
  ): Promise<ItemPage | Errors.Unexpected>;
}
