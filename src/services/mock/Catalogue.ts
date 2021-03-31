import { Catalogue, FieldTypes } from '@/types';
import { CatalogueService } from '../Catalogue';
import { Errors } from '../dtos';
import { Items } from './Item';

const catalogues: Catalogue[] = [
  {
    id: '0',
    name: 'Wines 🥤',
    itemCount: (function() {
      return Items.filter((item) => {
        return item.catalogue === '0';
      }).length;
    })(),
    ItemSchema: [
      {
        name: 'Color',
        type: FieldTypes.Enum,
        enum: ['red', 'rose', 'white'],
      },
    ],
  },
  {
    id: '1',
    name: 'Fish',
    itemCount: (function() {
      return Items.filter((item) => {
        return item.catalogue === '1';
      }).length;
    })(),
    ItemSchema: [],
  },
  {
    id: '2',
    name: 'Vegetables',
    itemCount: (function() {
      return Items.filter((item) => {
        return item.catalogue === '2';
      }).length;
    })(),
    ItemSchema: [],
  },
  {
    id: '3',
    name: 'Meat',
    itemCount: (function() {
      return Items.filter((item) => {
        return item.catalogue === '3';
      }).length;
    })(),
    ItemSchema: [],
  },
  {
    id: '4',
    name: 'Legumes',
    itemCount: (function() {
      return Items.filter((item) => {
        return item.catalogue === '4';
      }).length;
    })(),
    ItemSchema: [],
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
