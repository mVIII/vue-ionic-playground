import { CatalogueService } from '@/services/Catalogue';
import { Errors } from '@/services/dtos';
import { Catalogue, Item } from '@/types';
import { container } from 'tsyringe';
import { ref } from 'vue';

export function useCatalogue() {
  const catalogues = ref<Catalogue[]>([]);
  const items = ref<Item[]>([]);

  const catalogueService = container.resolve<CatalogueService>('Catalogue');

  async function getCatalogues() {
    const result = await catalogueService.GetCatalogues();

    if (result === Errors.Unexpected) {
      throw result;
    }
    catalogues.value = result;
  }

  async function getCatalogueItems(id: string) {
    const result = await catalogueService.GetCatalogueItems(id);
    if (result === Errors.Unexpected) {
      throw result;
    } else if (result === Errors.CatalogueNotFound) {
      throw result;
    }
    items.value = result;
  }

  return {
    items,
    catalogues,
    getCatalogueItems,
    getCatalogues,
  };
}
