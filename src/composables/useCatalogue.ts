import { CatalogueService } from '@/services/Catalogue';
import { Errors } from '@/services/dtos';
import { Catalogue, Item } from '@/types';
import createAsyncProcess from '@/utils/create-async-process';
import { container } from 'tsyringe';
import { ref, watch } from 'vue';

export function useCatalogue() {
  const selectedCatalogue = ref<Catalogue>({
    id: '',
    name: '',
    items: [],
  });
  const catalogues = ref<Catalogue[]>([]);
  const displayedItems = ref<Item[]>([]);

  const catalogueService = container.resolve<CatalogueService>('Catalogue');

  async function getCatalogues(): Promise<void> {
    const result = await catalogueService.GetCatalogues();

    if (result === Errors.Unexpected) {
      throw result;
    }
    catalogues.value = result;
  }

  async function getCatalogue(id: string): Promise<void> {
    const result = await catalogueService.GetCatalogue(id);
    if (result === Errors.Unexpected) {
      throw result;
    } else if (result === Errors.CatalogueNotFound) {
      throw result;
    }
    selectedCatalogue.value = result;
  }

  async function refreshCatalogues(event: any) {
    await getCatalogues();
    event.target.complete();
  }

  function filterDisplayedItems(query: string) {
    const itemsToDisplay = selectedCatalogue.value.items
      .map((item) =>
        item.name.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1
          ? item
          : null
      )
      .filter((v) => v) as Item[];
    displayedItems.value = itemsToDisplay;
  }

  const {
    active: cataloguesLoading,
    run: runWrappedGetCatalogues,
  } = createAsyncProcess(getCatalogues);

  watch(selectedCatalogue, () => {
    displayedItems.value = selectedCatalogue.value.items;
  });

  return {
    displayedItems,
    filterDisplayedItems,
    selectedCatalogue,
    catalogues,
    cataloguesLoading,
    refreshCatalogues,
    runWrappedGetCatalogues,
    getCatalogues,
    getCatalogue,
  };
}
