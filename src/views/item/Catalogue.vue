<template>
  <ion-page>
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>Items</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/catalogues"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="clickedAdd()">Add</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-toolbar style="padding-top:10px;">
        <ion-searchbar
          @ionInput="queryDisplayedItems($event.target.value)"
        ></ion-searchbar>
      </ion-toolbar>
      <div>
        <ion-chip
          v-for="sortingOption in sortingOptions"
          :key="sortingOption.name"
          @click="toggleSortingOption(sortingOption)"
        >
          <ion-label>{{ sortingOption.name }}</ion-label>
          <ion-icon
            v-if="sortingFilter.name === sortingOption.name"
            :icon="close"
          ></ion-icon>
        </ion-chip>
      </div>
      <ion-list>
        <ion-list-header>
          {{ selectedCatalogue.name }}
        </ion-list-header>
        <ion-item v-for="item in displayedItems" :key="item.name">
          <ion-avatar slot="start">
            <img :src="item.image" />
          </ion-avatar>
          <ion-label
            ><h2>{{ item.name }}</h2>
            <p>{{ item.description }}</p></ion-label
          >
        </ion-item>
      </ion-list>
      <ion-modal :is-open="filterModalOpen">
        <ItemFilter
          @dismiss="setFilterModalOpen(false)"
          @apply="applyFilter"
          :catalogue="selectedCatalogue"
          :itemFilter="itemFilter"
        ></ItemFilter>
      </ion-modal>
      <ion-modal :is-open="addEditModalOpen">
        <ItemNewEdit
          @dismiss="setAddEditModalOpen(false)"
          @save="runWrappedCreateItem() && setAddEditModalOpen(false)"
          :catalogue="selectedCatalogue"
          :item="CRUDItem"
        ></ItemNewEdit>
      </ion-modal>
      
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="setFilterModalOpen(true)">
          <ion-icon :icon="options"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-infinite-scroll
        @ionInfinite="infiteLoadCatalogueItems($event)"
        threshold="100px"
        id="infinite-scroll"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>

    <ion-loading
      :is-open="catalogueLoading || itemsLoading"
      message="Please wait..."
      :duration="1000"
    >
    </ion-loading>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonList,
  IonSearchbar,
  IonContent,
  IonLabel,
  IonItem,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonListHeader,
  IonBackButton,
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonModal,
  IonIcon,
  IonButton,
  IonChip,
} from '@ionic/vue';

import { useItem } from '@/composables/useItem';
import { onMounted } from '@vue/runtime-core';
import router from '@/router';
import { useCatalogue } from '@/composables/useCatalogue';
import { options, close } from 'ionicons/icons';
import ItemFilter from './Filter.vue';
import { ref } from 'vue';
import { Filter, SortingFilter, SortingType } from '@/services/dtos/';
import ItemNewEdit from './NewEdit.vue';

export default {
  name: 'Catalogue',
  components: {
    IonButtons,
    IonTitle,
    IonSearchbar,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonItem,
    IonList,
    IonContent,
    IonPage,
    IonListHeader,
    IonLoading,
    IonBackButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonAvatar,
    IonFabButton,
    IonFab,
    ItemFilter,
    IonModal,
    IonIcon,
    IonButton,
    ItemNewEdit,
    IonChip,
    //IonPopover,
  },
  setup() {
    const {
      runWrappedGetItemsByCatalogue,
      queryDisplayedItems,
      itemsLoading,
      displayedItems,
      itemFilter,
      sortingFilter,
      infiteLoadCatalogueItems,
      catalogueID,
      page,
      CRUDItem,
      runWrappedCreateItem,
    } = useItem();

    const {
      runWrappedGetCatalogue,
      catalogueLoading,
      selectedCatalogue,
    } = useCatalogue();

    onMounted(async () => {
      try {
        const catalogueId = router.currentRoute.value.params.id as string;
        await runWrappedGetCatalogue(catalogueId);
        catalogueID.value = catalogueId;
        await runWrappedGetItemsByCatalogue();
      } catch (error) {
        console.log(error);
      }
    });
    const filterModalOpen = ref(false);
    const setFilterModalOpen = (state: boolean) =>
      (filterModalOpen.value = state);

    const addEditModalOpen = ref(false);
    const setAddEditModalOpen = (state: boolean) =>
      (addEditModalOpen.value = state);

    const applyFilter = (newItemFilter: Filter) => {
      itemFilter.value = newItemFilter;
      setFilterModalOpen(false);
    };

    const toggleSortingOption = (sortingOption: SortingFilter) => {
      if (sortingFilter.value.name === sortingOption.name) {
        sortingFilter.value = {
          name: '',
          type: SortingType.none,
        };
      } else {
        sortingFilter.value = sortingOption;
      }
    };

    const sortingOptions: SortingFilter[] = [
      {
        name: 'Show newest first',
        type: SortingType.sortNewstFirst,
      },
      {
        name: 'Sort oldest first',
        type: SortingType.sortAlphabetically,
      },
      {
        name: 'Sort alphabetically',
        type: SortingType.sortAlphabetically,
      },
    ];

    const clickedAdd = () => {
      CRUDItem.value = {
        id: '',
        catalogue: '',
        name: '',
        fields: [],
      };
      setAddEditModalOpen(true);
    };

    return {
      selectedCatalogue,
      catalogueLoading,
      itemsLoading,
      queryDisplayedItems,
      displayedItems,
      infiteLoadCatalogueItems,
      filterModalOpen,
      setFilterModalOpen,
      itemFilter,
      options,
      applyFilter,
      page,
      addEditModalOpen,
      setAddEditModalOpen,
      clickedAdd,
      CRUDItem,
      runWrappedCreateItem,
      close,
      sortingOptions,
      sortingFilter,
      toggleSortingOption,
    };
  },
};
</script>
