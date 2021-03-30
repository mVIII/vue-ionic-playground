<template>
  <ion-page>
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>Catalogues</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="clickedAdd()">Add</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refreshCatalogues($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item v-for="catalogue in catalogues" :key="catalogue.name">
          <ion-label @click="goToCatalogue(catalogue.id)">{{
            catalogue.name
          }}</ion-label>
          <ion-badge color="secondary" slot="end">{{
            catalogue.itemCount
          }}</ion-badge>
          <ion-buttons slot="end">
            <ion-button @click="clickedOptions(catalogue)">
              <ion-icon
                :icon="ellipsisVertical"
                :ios="ellipsisHorizontal"
                :md="ellipsisVertical"
              />
            </ion-button>
          </ion-buttons>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-loading
      :is-open="cataloguesLoading || catalogueUploading"
      message="Please wait..."
      :duration="1000"
    >
    </ion-loading>
    <ion-action-sheet
      :is-open="optionsOpen"
      :header="CRDCatalogue.name"
      :buttons="optionButtons"
    >
    </ion-action-sheet>
    <ion-modal :is-open="addModalOpen">
      <CatalogueNew
        @dismiss="setModalOpen(false)"
        @save="saveCatalogue"
        :catalogue="CRDCatalogue"
      ></CatalogueNew>
    </ion-modal>
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
  IonModal,
} from '@ionic/vue';
import { useCatalogue } from '@/composables/useCatalogue';
import { onMounted } from '@vue/runtime-core';
import router from '@/router';
import { ellipsisVertical, ellipsisHorizontal } from 'ionicons/icons';
import { ref } from 'vue';
import CatalogueNew from './NewEdit.vue';
import { Catalogue } from '@/types';

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
    CatalogueNew,
    IonModal,
  },
  methods: {
    goToCatalogue(id: string) {
      router.push({ name: 'catalogue', params: { id: id } });
    },
  },
  setup() {
    const {
      catalogues,
      cataloguesLoading,
      catalogueUploading,
      runWrappedGetCatalogues,
      CRDCatalogue,
      runWrappedCreateCatalogue,
    } = useCatalogue();

    const addModalOpen = ref(false);
    const setModalOpen = (state: boolean) => (addModalOpen.value = state);

    const optionsOpen = ref(false);
    const setOptionsOpen = (state: boolean) => (optionsOpen.value = state);

    const saveCatalogue = async (catalogue: Catalogue) => {
      CRDCatalogue.value = catalogue;
      await runWrappedCreateCatalogue();
      setModalOpen(false);
    };

    const clickedAdd = () => {
      CRDCatalogue.value = {
        id: '',
        name: '',
        itemCount: 0,
        ItemSchema: [],
      };
      setOptionsOpen(false);
      setModalOpen(true);
    };

    const clickedOptions = (catalogue: Catalogue) => {
      CRDCatalogue.value = catalogue;
      setOptionsOpen(true);
    };

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
        text: 'Edit',
        handler: () => {
          setModalOpen(true);
          setOptionsOpen(false);
        },
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete');
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          setOptionsOpen(false);
        },
      },
    ];

    return {
      catalogues,
      cataloguesLoading,
      ellipsisHorizontal,
      ellipsisVertical,
      optionButtons,
      optionsOpen,
      setOptionsOpen,
      addModalOpen,
      setModalOpen,
      CRDCatalogue,
      saveCatalogue,
      clickedAdd,
      clickedOptions,
      catalogueUploading,
    };
  },
};
</script>
