import { Errors, ItemPage, Filter } from './dtos';

export interface ItemService {
  GetItemsByCatalogue(
    catalogueID: string,
    filter: Filter,
    page: number,
    max?: number
  ): Promise<ItemPage | Errors.Unexpected>;
}
