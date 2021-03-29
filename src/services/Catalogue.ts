import { Catalogue } from '@/types';
import { Errors } from './dtos';

export interface CatalogueService {
  CreateCatalogue(catalogue: Catalogue): Promise<Catalogue | Errors.Unexpected>;
  GetCatalogues(
    page: number,
  ): Promise<Catalogue[] | Errors.Unexpected>;
  GetCatalogue(
    id: string
  ): Promise<Catalogue | Errors.Unexpected | Errors.CatalogueNotFound>;
}
