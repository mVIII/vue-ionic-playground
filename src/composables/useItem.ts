import { Errors, ItemFilter } from '@/services/dtos';
import { ItemService } from '@/services/Item';
import { Item } from '@/types';
import createAsyncProcess from '@/utils/create-async-process';
import { container } from 'tsyringe';
import { ref, watch } from 'vue';

export function useItem() {
  const items = ref<Item[]>([]);
  const displayedItems = ref<Item[]>([]);
  const page = ref(1);
  const totalPages = ref(1);
  const itemFilter = ref<ItemFilter>({
    catalogue: '',
  });

  const itemService = container.resolve<ItemService>('Item');

  async function getItems(): Promise<void> {
  
    const result = await itemService.GetItems(itemFilter.value, page.value, 20);

    if (result === Errors.Unexpected) {
      throw result;
    }
    items.value = result.items;
    displayedItems.value = items.value;
    totalPages.value = result.pagination.pages;
  }

  async function infiteLoadItems(ev: any): Promise<void> {
    page.value++;
    const result = await itemService.GetItems(itemFilter.value, page.value, 20);

    if (result === Errors.Unexpected) {
      throw result;
    }
    items.value.push(...result.items);
    displayedItems.value = items.value;
    totalPages.value = result.pagination.pages;

    ev.target.complete();
  }

  function filterDisplayedItems(query: string) {
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

  const { active: loadingGet, run: runWrappedGetItems } = createAsyncProcess(
    getItems
  );

  //watch(page, runWrappedGetItems);

  //watch(itemFilter, runWrappedGetItems);

  watch(loadingGet, () => {
    itemsLoading.value = loadingGet.value;
  });

  return {
    itemsLoading,
    runWrappedGetItems,
    infiteLoadItems,
    filterDisplayedItems,
    displayedItems,
    itemFilter,
    page,
  };
}
