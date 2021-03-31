import { Errors, Filter, SortingFilter, SortingType } from '@/services/dtos';
import { ItemService } from '@/services/Item';
import { Item } from '@/types';
import { createAsyncProcess } from '@/utils';
import { container } from 'tsyringe';
import { ref, watch } from 'vue';

export function useItem() {
  const items = ref<Item[]>([]);
  const displayedItems = ref<Item[]>([]);
  const page = ref(1);
  const totalPages = ref(1);
  const itemFilter = ref<Filter>({
    aggregations: [],
  });

  const sortingFilter = ref<SortingFilter>({
    name: '',
    type: SortingType.none,
  });

  const catalogueID = ref<string>('');

  const itemService = container.resolve<ItemService>('Item');

  const CRUDItem = ref<Item>({
    id: '',
    catalogue: '',
    name: '',
    fields: [],
  });

  async function createItem(): Promise<void> {
    const result = await itemService.Create(CRUDItem.value);
    if (result === Errors.Unexpected) {
      throw result;
    }
  }

  async function getItemsByCatalogue(): Promise<void> {
    page.value = 1;
    const result = await itemService.GetItemsByCatalogue(
      catalogueID.value,
      itemFilter.value,
      page.value,
      20,
      sortingFilter.value
    );

    if (result === Errors.Unexpected) {
      throw result;
    }
    items.value = result.items;
    displayedItems.value = result.items;
    totalPages.value = result.pagination.pages;
  }

  async function infiteLoadCatalogueItems(ev: any): Promise<void> {
    page.value++;
    const result = await itemService.GetItemsByCatalogue(
      catalogueID.value,
      itemFilter.value,
      page.value,
      20
    );

    if (result === Errors.Unexpected) {
      throw result;
    }
    items.value.push(...result.items);
    displayedItems.value = items.value;
    totalPages.value = result.pagination.pages;

    ev.target.complete();
  }

  function queryDisplayedItems(query: string) {
    const itemsToDisplay = items.value
      .map((item) =>
        item.name.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1
          ? item
          : null
      )
      .filter((v) => v) as Item[];
    displayedItems.value = itemsToDisplay;
  }
  const itemsLoading = ref<boolean>(false);

  const {
    active: loadingGet,
    run: runWrappedGetItemsByCatalogue,
  } = createAsyncProcess(getItemsByCatalogue);

  const {
    active: loadingCreate,
    run: runWrappedCreateItem,
  } = createAsyncProcess(createItem);

  //watch(page, runWrappedGetItems);

  watch(itemFilter, runWrappedGetItemsByCatalogue);

  watch(sortingFilter, runWrappedGetItemsByCatalogue);

  watch(loadingGet, () => {
    itemsLoading.value = loadingGet.value;
  });

  watch(loadingCreate, () => {
    itemsLoading.value = loadingCreate.value;
  });

  return {
    itemsLoading,
    runWrappedGetItemsByCatalogue,
    infiteLoadCatalogueItems,
    queryDisplayedItems,
    displayedItems,
    itemFilter,
    sortingFilter,
    page,
    catalogueID,
    CRUDItem,
    runWrappedCreateItem,
  };
}
