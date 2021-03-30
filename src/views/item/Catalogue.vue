<template>
  <ion-page>
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>Items</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/catalogues"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-searchbar
          @ionInput="filterDisplayedItems($event.target.value)"
        ></ion-searchbar>
      </ion-toolbar>
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
} from '@ionic/vue';

import { useItem } from '@/composables/useItem';
import { onMounted } from '@vue/runtime-core';
import router from '@/router';
import { useCatalogue } from '@/composables/useCatalogue';
import { options } from 'ionicons/icons';
import ItemFilter from './Filter.vue';
import { ref } from 'vue';
import { Filter } from '@/services/dtos';

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
  },
  setup() {
    const {
      runWrappedGetItemsByCatalogue,
      filterDisplayedItems,
      itemsLoading,
      displayedItems,
      itemFilter,
      infiteLoadCatalogueItems,
      catalogueID,
      page,
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

    const applyFilter = async (newItemFilter: Filter) => {
      itemFilter.value = newItemFilter;
      setFilterModalOpen(false);
    };

    return {
      selectedCatalogue,
      catalogueLoading,
      itemsLoading,
      filterDisplayedItems,
      displayedItems,
      infiteLoadCatalogueItems,
      filterModalOpen,
      setFilterModalOpen,
      itemFilter,
      options,
      applyFilter,
      page,
    };
  },
};
</script>
