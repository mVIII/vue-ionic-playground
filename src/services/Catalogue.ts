import { Catalogue } from '@/types';
import { Errors } from './dtos';

export interface CatalogueService {
  GetCatalogues(): Promise<Catalogue[] | Errors.Unexpected>;
}
