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
      <ion-toolbar>
        <ion-list-header>
          Fields
          <ion-fab>
            <ion-fab-button @click="clickedAddField()">
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </ion-list-header>
      </ion-toolbar>
      <ion-item v-for="field in c.ItemSchema" :key="field.id">
        <ion-list>
          <ion-toolbar>
            <ion-list-header>
              {{ field.name }}
            </ion-list-header>
            <ion-buttons slot="end">
              <ion-button @click="clickedOptions(catalogue)">
                <ion-icon
                  :icon="ellipsisVertical"
                  :ios="ellipsisHorizontal"
                  :md="ellipsisVertical"
                />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
          <ion-item>
            <ion-label>Name</ion-label>
            <ion-input
              placeholder="Field name"
              v-model="field.name"
              slot="end"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Type</ion-label>
            <ion-select interface="popover" v-model="field.type" slot="end">
              <ion-select-option value="0">Alpharithemtic</ion-select-option>
              <ion-select-option value="1">Number</ion-select-option>
              <ion-select-option value="2">Enum</ion-select-option>
              <ion-select-option value="3">Boolean</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Required</ion-label>
            <ion-toggle
              color="primary"
              v-model="field.required"
              slot="end"
            ></ion-toggle>
          </ion-item>
          <ion-item v-if="field.type == 2">
            <ion-label position="stacked">Values</ion-label>
            <ion-textarea>
              <ion-chip v-for="enumVal in field.enum" :key="enumVal">
                <ion-label>{{ enumVal }}</ion-label>
                <ion-icon :icon="close"></ion-icon>
              </ion-chip>
            </ion-textarea>
          </ion-item>
        </ion-list>
      </ion-item>
      <ion-item-divider></ion-item-divider>
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
  IonSelect,
  IonSelectOption,
  IonChip,
  IonTextarea,
  IonIcon,
  IonItemDivider,
  IonToggle,
  IonFabButton,
  IonFab,
} from '@ionic/vue';

import { Catalogue, FieldTypes } from '@/types';
import { PropType } from '@vue/runtime-core';
import { ref } from 'vue';
import {
  close,
  add,
  ellipsisVertical,
  ellipsisHorizontal,
} from 'ionicons/icons';
export default {
  name: 'CatalogueNewEdit',
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
    IonSelect,
    IonSelectOption,
    IonChip,
    IonTextarea,
    IonIcon,
    IonItemDivider,
    IonToggle,
    IonFabButton,
    IonFab,
  },
  emits: ['dismiss', 'save'],
  props: {
    catalogue: {
      type: Object as PropType<Catalogue>,
      default: { id: '', name: '', itemCount: 0, ItemSchema: [] },
    },
  },
  setup(props: any): Record<string, unknown> {
    const title =
      props.catalogue.name === '' ? 'New Catalogue' : props.catalogue.name;
    const c = ref<Catalogue>(props.catalogue);

    const clickedAddField = () => {
      c.value.ItemSchema.unshift({
        id: '0',
        name: 'New Field',
        type: FieldTypes.String,
        required: false,
      });
    };

    return {
      clickedAddField,
      ellipsisVertical,
      ellipsisHorizontal,
      add,
      close,
      c,
      title,
    };
  },
};
</script>
<style scoped>
ion-fab-button {
  margin-left: 70px;
  width: 23px;
  height: 23px;
}
</style>
