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
    itemCount: 0,
  });

  //CREATE/UPDATE/DELETE catalogue
  const CRDCatalogue = ref<Catalogue>({
    id: '',
    name: '',
    itemCount: 0,
  });

  const catalogues = ref<Catalogue[]>([]);
  const displayedItems = ref<Item[]>([]);

  const page = ref(1);

  const catalogueService = container.resolve<CatalogueService>('Catalogue');

  async function createCatalogue(): Promise<void> {
    const result = await catalogueService.CreateCatalogue(CRDCatalogue.value);
    if (result === Errors.Unexpected) {
      throw result;
    }
    //EMPTY
    CRDCatalogue.value = {
      id: '',
      name: '',
      itemCount: 0,
    };
  }

  async function getCatalogues(): Promise<void> {
    const result = await catalogueService.GetCatalogues(page.value);

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

  const {
    active: catalogueLoading,
    run: runWrappedGetCatalogue,
  } = createAsyncProcess(getCatalogue);

  const {
    active: cataloguesLoading,
    run: runWrappedGetCatalogues,
  } = createAsyncProcess(getCatalogues);

  const {
    active: catalogueUploading,
    run: runWrappedCreateCatalogue,
  } = createAsyncProcess(createCatalogue);

  //watch(page, runWrappedGetCatalogues);

  return {
    displayedItems,
    selectedCatalogue,
    catalogues,
    cataloguesLoading,
    refreshCatalogues,
    runWrappedGetCatalogues,
    getCatalogues,
    getCatalogue,
    catalogueUploading,
    runWrappedCreateCatalogue,
    CRDCatalogue,
    runWrappedGetCatalogue,
    catalogueLoading,
  };
}
