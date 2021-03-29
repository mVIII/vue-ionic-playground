import { Errors, ItemFilter, ItemPage } from '../dtos';
import { ItemService } from '../Item';
import { Item } from '@/types';

const Items: Item[] = [
  {
    id: '0',
    catalogue: '0',
    name: 'Beaucastel (Château)',
  },
  {
    id: '1',
    catalogue: '0',
    name: 'Cheval Blanc (Château)',
  },
  {
    id: '2',
    catalogue: '0',
    name: 'Corton-Charlemagne',
  },
  {
    id: '3',
    catalogue: '0',
    name: 'Dom Pérignon',
  },
  {
    id: '4',
    catalogue: '0',
    name: 'Ducru-Beaucaillou (Château)',
  },
  {
    id: '5',
    catalogue: '1',
    name: 'Anchovy',
  },
  {
    id: '6',
    catalogue: '1',
    name: 'Carp',
  },
  {
    id: '7',
    catalogue: '1',
    name: 'Bobby',
  },
  {
    id: '8',
    catalogue: '1',
    name: 'Bluefin Tuna',
  },
  {
    id: '8',
    catalogue: '1',
    name: 'Salmon',
  },
  {
    id: '9',
    catalogue: '1',
    name: 'Catafish',
  },
  {
    id: '10',
    catalogue: '1',
    name: 'Hammerhead shark',
  },
  {
    id: '11',
    catalogue: '1',
    name: 'Clownfish',
  },
  {
    id: '12',
    catalogue: '2',
    name: 'Tomatos',
  },
  {
    id: '13',
    catalogue: '2',
    name: 'Cellery',
  },
  {
    id: '14',
    catalogue: '2',
    name: 'Potatos',
  },
  {
    id: '15',
    catalogue: '2',
    name: 'Onions',
  },
  {
    id: '15',
    catalogue: '2',
    name: 'Eggplants',
  },
  {
    id: '16',
    catalogue: '2',
    name: 'Raddish',
  },
  {
    id: '17',
    catalogue: '2',
    name: 'Green Onions',
  },
  {
    id: '18',
    catalogue: '3',
    name: 'Jamón ibérico',
  },
  {
    id: '19',
    catalogue: '3',
    name: 'Sirloin(Prime)',
  },
  {
    id: '20',
    catalogue: '3',
    name: 'Sirloin(Choise)',
  },
  {
    id: '21',
    catalogue: '3',
    name: 'Tomahwk(Choice)',
  },
  {
    id: '22',
    catalogue: '3',
    name: 'Brisket(Prime)',
  },
  {
    id: '23',
    catalogue: '3',
    name: 'Ribeye(Wagyu A5)',
  },
  {
    id: '24',
    catalogue: '4',
    name: 'Cheakpeas',
  },
  {
    id: '25',
    catalogue: '4',
    name: 'Lentils',
  },
  {
    id: '26',
    catalogue: '4',
    name: 'Green beans',
  },
  {
    id: '27',
    catalogue: '4',
    name: 'Beans',
  },
  {
    id: '28',
    catalogue: '4',
    name: 'Fava',
  },
];

export default class MockItemService implements ItemService {
  async GetItems(
    filter: ItemFilter,
    page: number,
    max = 5
  ): Promise<ItemPage | Errors.Unexpected> {
    let items: Item[] = [];

    if (filter.catalogue !== '') {
      items = Items.filter((item) => {
        return item.catalogue == filter.catalogue;
      });
    }
    //PAGINATE
    //for (let i = (page - 1) * max; i < page * max; i++) {}
    const pageResult = items.filter((item, index) => {
      return index >= (page - 1) * max && index <= page * max;
    });

    const result: ItemPage = {
      items: pageResult,
      pagination: {
        total: this.pagesNum(items, max),
        next: 'next/url',
      },
    };

    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pagesNum<T = any>(list: Array<T>, max: number): number {
    return Math.ceil(list.length / max);
  }
}
