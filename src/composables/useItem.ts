import { CatalogueService } from '@/services/Catalogue';
import { Errors } from '@/services/dtos';
import { ItemService } from '@/services/Item';
import { Item } from '@/types';
import createAsyncProcess from '@/utils/create-async-process';
import { container } from 'tsyringe';
import { ref, watch } from 'vue';

export function userItem() {
  const displayedItems = ref<Item[]>([]);
  const page = ref(1);
  const totalPages = ref(1);
  const catalogueSelected = ref('');

  const itemService = container.resolve<ItemService>('Item');

  async function getItems(catalogueID: string): Promise<void> {
    const result = await itemService.GetItems(
      { catalogue: catalogueID },
      page.value,
      3
    );

    if (result === Errors.Unexpected) {
      throw result;
    }

    displayedItems.value = result.items;
    totalPages.value = result.pagination.total;
  }

  function filterDisplayedItems(query: string) {
    const itemsToDisplay = displayedItems.value
      .map((item) =>
        item.name.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1
          ? item
          : null
      )
      .filter((v) => v) as Item[];
    displayedItems.value = itemsToDisplay;
  }

  const { active: itemsLoading, run: runWrappedGetItems } = createAsyncProcess(
    getItems
  );

  watch(page, () => {
    runWrappedGetItems(catalogueSelected.value);
  });

  return {
    itemsLoading,
    runWrappedGetItems,
    filterDisplayedItems,
  };
}
