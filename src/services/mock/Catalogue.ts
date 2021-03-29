import { Catalogue } from '@/types';
import { CatalogueService } from '../Catalogue';
import { Errors } from '../dtos';

const catalogues: Catalogue[] = [
  {
    id: '0',
    name: 'Wines 🥤',
  },
  {
    id: '1',
    name: 'Fish',
  },
  {
    id: '2',
    name: 'Vegetables',
  },
  {
    id: '3',
    name: 'Meat',
  },
  {
    id: '4',
    name: 'Legumes',
  },
];

export default class MockCatalogueService implements CatalogueService {
  async CreateCatalogue(
    catalogue: Catalogue
  ): Promise<Catalogue | Errors.Unexpected> {
    catalogue.id = String(catalogues.length + 1);
    catalogues.push(catalogue);

    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    return catalogue;
  }

  async GetCatalogues(page: number): Promise<Catalogue[] | Errors.Unexpected> {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    return catalogues;
  }
  async GetCatalogue(
    id: string
  ): Promise<Catalogue | Errors.Unexpected | Errors.CatalogueNotFound> {
    let selectedCatalogue: Catalogue | null = null;
    catalogues.forEach((catalogue) => {
      if (catalogue.id === id) {
        selectedCatalogue = catalogue;
      }
    });

    if (!selectedCatalogue) {
      return Errors.CatalogueNotFound;
    }
    return selectedCatalogue;
  }
}
