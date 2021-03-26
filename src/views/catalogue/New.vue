<template>
  <ion-header class="ion-hide-md-up">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="$emit('dismiss')">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-list lines="full" class="ion-no-margin">
      <ion-list-header lines="full">
        <ion-label>
          {{ title }}
        </ion-label>
      </ion-list-header>
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input placeholder="Name" v-model="c.name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Description</ion-label>
        <ion-input
          placeholder="Description"
          v-model="c.description"
        ></ion-input>
      </ion-item>
    </ion-list>
    <ion-button expand="block" @click="$emit('save', c)">Add</ion-button>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonInput,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/vue';

import { Catalogue } from '@/types';
import { PropType } from '@vue/runtime-core';
import { ref } from 'vue';

export default {
  name: 'CatalogueNew',
  components: {
    IonButtons,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonButton,
  },
  emits: ['dismiss', 'save'],
  props: {
    catalogue: {
      type: Object as PropType<Catalogue>,
      default: { id: '', name: '', items: [] },
    },
  },
  setup(props: any): Record<string, unknown> {
    const title =
      props.catalogue.name === '' ? 'New Catalogue' : props.catalogue.name;
    const c = ref<Catalogue>(props.catalogue);
    return {
      c,
      title,
    };
  },
};
</script>
