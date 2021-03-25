<template>
  <ion-page>
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>Items</ion-title>
        <ion-buttons slot="start">
          <ion-back-button href="catalogues">></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="item in items" :key="item.name">
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonList,
  IonContent,
  IonLabel,
  IonItem,
  IonHeader,
  IonToolbar,
  
  IonButtons,
  IonTitle,
  IonBackButton,
} from '@ionic/vue';

import { useCatalogue } from '@/composables/useCatalogue';
import { onMounted } from '@vue/runtime-core';
import router from '@/router';
export default {
  name: 'Catalogue',
  components: {
    IonButtons,
    IonTitle,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonItem,
    IonList,
    IonContent,
    IonPage,
   
    IonBackButton,
  },
  setup() {
    const { getCatalogueItems, items } = useCatalogue();

    onMounted(async () => {
      try {
        const routeID = router.currentRoute.value.params.id as string;

        await getCatalogueItems(routeID);
      } catch (error) {
        console.log(error);
      }
    });

    return { items };
  },
};
</script>
