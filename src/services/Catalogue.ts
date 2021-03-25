import { Catalogue, Item } from '@/types';
import { Errors } from './dtos';

export interface CatalogueService {
  GetCatalogues(): Promise<Catalogue[] | Errors.Unexpected>;
  GetCatalogueItems(
    id: string
  ): Promise<Item[] | Errors.Unexpected | Errors.CatalogueNotFound>;
}
