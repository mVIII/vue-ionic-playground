import { Catalogue } from '@/types';
import { CatalogueService } from '../Catalogue';
import { Errors } from '../dtos';

const catalogues: Catalogue[] = [
  {
    id: '0',
    name: 'Wines',
    items: [
      {
        id: '0',
        name: 'Beaucastel (Château)',
      },
      {
        id: '1',
        name: 'Cheval Blanc (Château)',
      },
      {
        id: '2',
        name: 'Corton-Charlemagne',
      },
      {
        id: '4',
        name: 'Dom Pérignon',
      },
      {
        id: '5',
        name: 'Ducru-Beaucaillou (Château)',
      },
    ],
  },
  {
    id: '1',
    name: 'Fish',
    items: [
      {
        id: '0',
        name: 'Anchovy',
      },
      {
        id: '1',
        name: 'Carp',
      },
      {
        id: '2',
        name: 'Bobby',
      },
      {
        id: '3',
        name: 'Bluefin Tuna',
      },
      {
        id: '4',
        name: 'Salmon',
      },
      {
        id: '5',
        name: 'Catafish',
      },
      {
        id: '6',
        name: 'Hammerhead shark',
      },
      {
        id: '7',
        name: 'Clownfish',
      },
    ],
  },
  {
    id: '2',
    name: 'Vegetables',
    items: [
      {
        id: '0',
        name: 'Tomatos',
      },
      {
        id: '1',
        name: 'Cellery',
      },
      {
        id: '2',
        name: 'Potatos',
      },
      {
        id: '3',
        name: 'Onions',
      },
      {
        id: '4',
        name: 'Eggplants',
      },
      {
        id: '5',
        name: 'Raddish',
      },
      {
        id: '6',
        name: 'Green Onions',
      },
    ],
  },
  {
    id: '3',
    name: 'Meat',
    items: [
      {
        id: '0',
        name: 'Jamón ibérico',
      },
      {
        id: '1',
        name: 'Sirloin(Prime)',
      },
      {
        id: '2',
        name: 'Sirloin(Choise)',
      },
      {
        id: '3',
        name: 'Tomahwk(Choice)',
      },
      {
        id: '4',
        name: 'Brisket(Prime)',
      },
      {
        id: '5',
        name: 'Ribeye(Wagyu A5)',
      },
    ],
  },
  {
    id: '4',
    name: 'Legumes',
    items: [
      {
        id: '0',
        name: 'Cheakpeas',
      },
      {
        id: '1',
        name: 'Lentils',
      },
      {
        id: '2',
        name: 'Green beans',
      },
      {
        id: '3',
        name: 'Beans',
      },
      {
        id: '4',
        name: 'Fava',
      },
    ],
  },
];

export default class MockCatalogueService implements CatalogueService {
  async GetCatalogues(): Promise<Catalogue[] | Errors.Unexpected> {
    return catalogues;
  }
}
