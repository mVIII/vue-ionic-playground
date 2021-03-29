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
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll
        @ionInfinite="infiteLoadItems($event)"
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
} from '@ionic/vue';

import { useItem } from '@/composables/useItem';
import { onMounted } from '@vue/runtime-core';
import router from '@/router';
import { useCatalogue } from '@/composables/useCatalogue';

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
  },
  setup() {
    const {
      runWrappedGetItems,
      filterDisplayedItems,
      itemsLoading,
      displayedItems,
      itemFilter,
      page,
      infiteLoadItems,
    } = useItem();

    const {
      selectedCatalogue,
      getCatalogue,
      catalogueLoading,
    } = useCatalogue();

    onMounted(async () => {
      try {
        const catalogueID = router.currentRoute.value.params.id as string;
        await getCatalogue(catalogueID);
        itemFilter.value = { catalogue: catalogueID };
        await runWrappedGetItems();
      } catch (error) {
        console.log(error);
      }
    });
    

    return {
      selectedCatalogue,
      catalogueLoading,
      itemsLoading,
      filterDisplayedItems,
      displayedItems,
      infiteLoadItems,
    };
  },
};
</script>
