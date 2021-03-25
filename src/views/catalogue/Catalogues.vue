<template>
  <ion-page>
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>Catalogues</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item
          v-for="catalogue in catalogues"
          :key="catalogue.name"
          @click="goToCatalogue(catalogue.id)"
        >
          <ion-label>{{ catalogue.name }}</ion-label>
          <ion-badge color="secondary" slot="end">{{
            catalogue.items.length
          }}</ion-badge>
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
  IonBadge,
  IonItem,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonTitle,
} from '@ionic/vue';

import { useCatalogue } from '@/composables/useCatalogue';
import { onMounted } from '@vue/runtime-core';
import router from '@/router';

export default {
  name: 'Catalogues',
  components: {
    IonButtons,
    IonTitle,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonBadge,
    IonItem,
    IonList,
    IonContent,
    IonPage,
    IonMenuButton,
  },
  methods: {
    goToCatalogue(id: string) {
      router.push({ name: 'catalogue', params: { id: id } });
    },
  },
  setup() {
    const { getCatalogues, catalogues } = useCatalogue();

    onMounted(async () => {
      try {
        await getCatalogues();
        console.log('ready');
      } catch (error) {
        console.log(error);
      }
    });

    return { catalogues };
  },
};
</script>
