<template>
  <ion-header class="ion-hide-md-up">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="$emit('dismiss')">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-toolbar>
      <ion-segment v-model="segment">
        <ion-segment-button value="options">
          <ion-label>Options</ion-label>
        </ion-segment-button>
        <ion-segment-button value="fields">
          <ion-label>Fields</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
  </ion-header>
  <!---OPTIONS--->
  <ion-content :fullscreen="true" v-if="segment === 'options'">
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
  <!---FIELDS--->
  <FieldEditor
    v-else-if="segment === 'fields'"
    :scheme="c.ItemSchema"
    @save="$emit('save', c)"
  ></FieldEditor>
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
  IonSegment,
  IonSegmentButton,
} from '@ionic/vue';

import { Catalogue, FieldTypes } from '@/types';
import { PropType } from '@vue/runtime-core';
import { ref } from 'vue';
import FieldEditor from '@/components/FieldEditor.vue';
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
    // IonSelect,
    // IonSelectOption,
    // IonChip,
    // IonTextarea,
    // IonIcon,
    // IonItemDivider,
    // IonToggle,
    // IonFabButton,
    // IonFab,
    IonSegment,
    IonSegmentButton,
    FieldEditor,
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

    const enumTextarea = ref<string>('');

    const segment = ref<string>('options');

    const clickedAddField = () => {
      c.value.ItemSchema.unshift({
        id: '0',
        name: 'New Field',
        type: FieldTypes.String,
        required: false,
      });
    };

    const removeEnumValue = (fieldName: string, val: string) => {
      const fieldIndex = c.value.ItemSchema.findIndex((field) => {
        return field.name === fieldName;
      });

      c.value.ItemSchema[fieldIndex].enum = c.value.ItemSchema[
        fieldIndex
      ].enum?.filter((enumValue) => {
        return enumValue !== val;
      });
    };

    const appendEnumValue = (fieldName: string) => {
      const fieldIndex = c.value.ItemSchema.findIndex((field) => {
        return field.name === fieldName;
      });

      if (!c.value.ItemSchema[fieldIndex].enum) {
        c.value.ItemSchema[fieldIndex].enum = [];
      }

      c.value.ItemSchema[fieldIndex].enum?.push(enumTextarea.value);
      enumTextarea.value = '';
    };

    const truncateEnumValue = (fieldName: string) => {
      if (enumTextarea.value == '') {
        const fieldIndex = c.value.ItemSchema.findIndex((field) => {
          return field.name === fieldName;
        });
        c.value.ItemSchema[fieldIndex].enum?.splice(-1, 1);
      }
    };

    return {
      enumTextarea,
      truncateEnumValue,
      removeEnumValue,
      appendEnumValue,
      clickedAddField,
      ellipsisVertical,
      ellipsisHorizontal,
      add,
      close,
      c,
      title,
      segment,
    };
  },
};
</script>
