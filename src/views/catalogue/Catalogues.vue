<template>
  <ion-page>
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>Catalogues</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="setOptionsOpen(true)">
            <ion-icon
              :icon="ellipsisVertical"
              :ios="ellipsisHorizontal"
              :md="ellipsisVertical"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refreshCatalogues($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
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
    <ion-loading
      :is-open="cataloguesLoading"
      message="Please wait..."
      :duration="1000"
    >
    </ion-loading>
    <ion-action-sheet
      :is-open="optionsOpen"
      header="Catalogues"
      :buttons="optionButtons"
    >
    </ion-action-sheet>
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
  IonLoading,
  IonRefresher,
  IonIcon,
  IonRefresherContent,
  IonButton,
  IonActionSheet,
} from '@ionic/vue';
import { useCatalogue } from '@/composables/useCatalogue';
import { onMounted } from '@vue/runtime-core';
import router from '@/router';
import { book, ellipsisVertical, ellipsisHorizontal } from 'ionicons/icons';
import { ref } from 'vue';
export default {
  name: 'Catalogues',
  components: {
    IonButton,
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
    IonLoading,
    IonRefresher,
    IonIcon,
    IonRefresherContent,
    IonActionSheet,
  },
  methods: {
    goToCatalogue(id: string) {
      router.push({ name: 'catalogue', params: { id: id } });
    },
  },
  setup() {
    const {
      refreshCatalogues,
      catalogues,
      cataloguesLoading,
      runWrappedGetCatalogues,
    } = useCatalogue();

    const optionsOpen = ref(false);
    const setOptionsOpen = (state: boolean) => (optionsOpen.value = state);

    onMounted(async () => {
      try {
        await runWrappedGetCatalogues();
      } catch (error) {
        console.log(error);
      }
    });

    type Button = {
      text: string;
      role?: string;
      icon?: string;
      handler: Function;
    };

    const optionButtons: Button[] = [
      {
        text: 'Add',
        handler: () => {
          console.log('Add');
        },
      },
      {
        text: 'Edit',
        handler: () => {
          console.log('Delete');
        },
      },
      {
        text: 'Delete',
        role:"destructive",
        handler: () => {
          console.log('Delete');
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          setOptionsOpen(false);
          console.log('Cancel');
        },
      },
    ];

    return {
      catalogues,
      cataloguesLoading,
      refreshCatalogues,
      book,
      ellipsisHorizontal,
      ellipsisVertical,
      optionButtons,
      optionsOpen,
      setOptionsOpen,
    };
  },
};
</script>
