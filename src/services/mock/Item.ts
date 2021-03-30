import { AggregationType, Errors, Filter, ItemPage } from '../dtos';
import { ItemService } from '../Item';
import { FieldTypes, Item } from '@/types';

const wineIcons: string[] = [
  'https://www.greeceandgrapes.com/image/cache/catalog/Skouras/SkourasFleva-600x600.png',
  'https://www.oinognosia.wine/wp-content/uploads/2018/05/assyrtiko_santo5.jpg',
  'https://www.houseofwine.gr/how/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/9/3/937.jpg',
  'https://www.houseofwine.gr/how/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/w/i/wines_1864_chateaumontrose.jpg',
  'https://www.greeceandgrapes.com/image/cache/catalog/Skouras/Viognier-600x600.png',
];

const fishIcons: string[] = [
  'https://api.time.com/wp-content/uploads/2019/11/fish-with-human-face-tik-tok-video.jpg',
  'https://thumbs-prod.si-cdn.com/7UodV-s6j5aEVfrYwg5KQ26oBLY=/fit-in/1600x0/https://public-media.si-cdn.com/filer/d6/93/d6939718-4e41-44a8-a8f3-d13648d2bcd0/c3npbx.jpg',
  'https://images.immediate.co.uk/production/volatile/sites/4/2009/07/GettyImages-931270318-43ab672.jpg',
  'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/DCTM_Penguin_UK_DK_AL644648_p7nd0z.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5xBxOOmPdCfnK_r3_adTd4ts5S2BeFmWzA&usqp=CAU',
];

const vegetableIcons: string[] = [
  'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg',
  'https://hips.hearstapps.com/hmg-prod/images/delish-grilled-asparagus-1522951967.jpg',
  'https://static.libertyprim.com/files/familles/celeri-large.jpg',
  'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/artichoke-title-image-e6dfc26.jpg',
  'https://www.gardeningknowhow.com/wp-content/uploads/2020/03/primo-vantage-400x350.jpg',
];

const items = (
  catalogue: string,
  prefix: string,
  description: string,
  icons: string[],
  number: number,

  starting = 0
): Item[] => {
  const w: Item[] = [];
  for (let index = 0; index < number; index++) {
    w.push({
      id: '' + index + starting,
      catalogue: catalogue,
      name: prefix + index,
      description: description,
      image: icons[Math.floor(Math.random() * icons.length)],
      fields: [],
    });
  }
  return w;
};

const makeWines = (
  catalogue: string,
  prefix: string,
  description: string,
  colors: string[],
  icons: string[],
  number: number,

  starting = 0
): Item[] => {
  const w: Item[] = [];
  for (let index = 0; index < number; index++) {
    w.push({
      id: '' + index + starting,
      catalogue: catalogue,
      name: prefix + index,
      description: description,
      image: icons[Math.floor(Math.random() * icons.length)],
      fields: [
        {
          name: 'color',
          type: FieldTypes.Enum,
          value: colors[Math.floor(Math.random() * colors.length)],
        },
      ],
    });
  }
  return w;
};

export const Items: Item[] = [
  {
    id: '18',
    catalogue: '3',
    name: 'Jamón ibérico',
    fields: [],
  },
  {
    id: '19',
    catalogue: '3',
    name: 'Sirloin(Prime)',
    fields: [],
  },
  {
    id: '20',
    catalogue: '3',
    name: 'Sirloin(Choise)',
    fields: [],
  },
  {
    id: '21',
    catalogue: '3',
    name: 'Tomahwk(Choice)',
    fields: [],
  },
  {
    id: '22',
    catalogue: '3',
    name: 'Brisket(Prime)',
    fields: [],
  },
  {
    id: '23',
    catalogue: '3',
    name: 'Ribeye(Wagyu A5)',
    fields: [],
  },
  {
    id: '24',
    catalogue: '4',
    name: 'Cheakpeas',
    fields: [],
  },
  {
    id: '25',
    catalogue: '4',
    name: 'Lentils',
    fields: [],
  },
  {
    id: '26',
    catalogue: '4',
    name: 'Green beans',
    fields: [],
  },
  {
    id: '27',
    catalogue: '4',
    name: 'Beans',
    fields: [],
  },
  {
    id: '28',
    catalogue: '4',
    name: 'Fava',
    fields: [],
  },
];

Items.push(
  ...makeWines(
    '0',
    'wine ',
    'This a wine',
    ['red', 'white', 'rose'],
    wineIcons,
    30,
    28
  )
);
Items.push(...items('1', 'fish ', 'This a fish', fishIcons, 35, 58));
Items.push(
  ...items('2', 'vegetable ', 'This a vegetable', vegetableIcons, 35, 93)
);

export default class MockItemService implements ItemService {
  async GetItemsByCatalogue(
    catalogueID: string,
    filter: Filter,
    page: number,
    max = 5
  ): Promise<ItemPage | Errors.Unexpected> {
    let items: Item[] = Items.filter((item) => {
      return item.catalogue === catalogueID;
    });
    console.log("FILTERING")
    filter.aggregations.forEach((aggregation) => {
      if (aggregation.type === AggregationType.eq) {
        const result = items.filter((item) => {
          return item.fields.some((field) =>
            (aggregation.query as string[]).includes(field.value)
          );
        });
        console.log(result);
        items = result;
      } else {
        items = [];
      }
    });

    const pageResult = items.filter((item, index) => {
      return index >= (page - 1) * max && index < page * max;
    });
    const result: ItemPage = {
      items: pageResult,
      pagination: {
        pages: this.pagesNum(items, max),
        next: 'next/url',
      },
    };
    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pagesNum<T = any>(list: Array<T>, max: number): number {
    return Math.ceil(list.length / max);
  }
}
