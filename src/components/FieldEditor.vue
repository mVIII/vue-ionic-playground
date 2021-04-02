<template>
  <ion-content>
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
    <ion-item v-for="(field, index) in itemSchema" :key="field.id">
      <ion-list>
        <ion-toolbar>
          <ion-list-header>
            {{ field.name }}
          </ion-list-header>
          <ion-buttons slot="end">
            <ion-button @click="clickedDeleteField(field, index)">
              <ion-icon :icon="close" />
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
          <ion-select
            interface="popover"
            v-model.number="field.type"
            slot="end"
          >
            <ion-select-option :value="0">Alpharithemtic</ion-select-option>
            <ion-select-option :value="1">Number</ion-select-option>
            <ion-select-option :value="2">Enum</ion-select-option>
            <ion-select-option :value="3">Boolean</ion-select-option>
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
          <ion-textarea
            v-model="enumTextarea"
            @keyup.enter="appendEnumValue(field.name)"
            @keyup.delete="truncateEnumValue(field.name)"
          >
            <ion-chip v-for="enumVal in field.enum" :key="enumVal">
              <ion-label>{{ enumVal }}</ion-label>
              <ion-icon
                :icon="close"
                @click="removeEnumValue(field.name, enumVal)"
              ></ion-icon>
            </ion-chip>
          </ion-textarea>
        </ion-item>
      </ion-list>
    </ion-item>
    <ion-item-divider></ion-item-divider>
    <ion-button expand="block" @click="$emit('save')">Add</ion-button>
  </ion-content>
  <ion-alert
    :is-open="isAlertOpenRef"
    :header="fieldToDelete.header"
    :message="fieldToDelete.message"
    :buttons="alertButtons"
    @onDidDismiss="setAlertOpen(false)"
  >
  </ion-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from '@vue/runtime-core';
import { FieldTypes, schemaField } from '@/types';
import { ref } from 'vue';
import { close, add } from 'ionicons/icons';

import {
  IonSelect,
  IonSelectOption,
  IonChip,
  IonTextarea,
  IonIcon,
  IonItemDivider,
  IonToggle,
  IonFabButton,
  IonFab,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonListHeader,
  IonToolbar,
  IonAlert,
} from '@ionic/vue';

export default defineComponent({
  name: 'FieldEditor',
  components: {
    IonSelect,
    IonSelectOption,
    IonChip,
    IonTextarea,
    IonIcon,
    IonItemDivider,
    IonToggle,
    IonFabButton,
    IonFab,
    IonContent,
    IonInput,
    IonList,
    IonItem,
    IonButtons,
    IonButton,
    IonListHeader,
    IonToolbar,
    IonAlert,
  },
  emits: ['save'],
  props: {
    scheme: {
      type: Object as PropType<schemaField[]>,
      default: [],
    },
  },
  setup(props: any): Record<string, unknown> {
    const itemSchema = ref<schemaField[]>(props.scheme);

    const enumTextarea = ref<string>('');
    const fieldToDelete = ref<{
      header: string;
      message: string;
      fieldIndex: number;
    }>({ header: '', message: '', fieldIndex: -1 });

    const isAlertOpenRef = ref(false);
    const setAlertOpen = (state: boolean) => (isAlertOpenRef.value = state);

    const clickedAddField = () => {
      itemSchema.value.unshift({
        id: '0',
        name: 'New Field',
        type: FieldTypes.String,
        required: false,
      });
    };

    const alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Ok',
        handler: () => {
          itemSchema.value.splice(fieldToDelete.value.fieldIndex, 1);
          fieldToDelete.value = { header: '', message: '', fieldIndex: -1 };
        },
      },
    ];

    const clickedDeleteField = (field: schemaField, index: number) => {
      setAlertOpen(true);
      fieldToDelete.value = {
        header: 'Delete ' + field.name,
        message: 'Are you sure you want to delete field ' + field.name + '?',
        fieldIndex: index,
      };
    };

    const removeEnumValue = (fieldName: string, val: string) => {
      const fieldIndex = itemSchema.value.findIndex((field) => {
        return field.name === fieldName;
      });

      itemSchema.value[fieldIndex].enum = itemSchema.value[
        fieldIndex
      ].enum?.filter((enumValue) => {
        return enumValue !== val;
      });
    };

    const appendEnumValue = (fieldName: string) => {
      const fieldIndex = itemSchema.value.findIndex((field) => {
        return field.name === fieldName;
      });

      if (!itemSchema.value[fieldIndex].enum) {
        itemSchema.value[fieldIndex].enum = [];
      }

      itemSchema.value[fieldIndex].enum?.push(enumTextarea.value);
      enumTextarea.value = '';
    };

    const truncateEnumValue = (fieldName: string) => {
      if (enumTextarea.value == '') {
        const fieldIndex = itemSchema.value.findIndex((field) => {
          return field.name === fieldName;
        });
        itemSchema.value[fieldIndex].enum?.splice(-1, 1);
      }
    };

    return {
      enumTextarea,
      truncateEnumValue,
      removeEnumValue,
      appendEnumValue,
      clickedAddField,
      itemSchema,
      close,
      add,
      isAlertOpenRef,
      setAlertOpen,
      clickedDeleteField,
      fieldToDelete,
      alertButtons,
    };
  },
});
</script>
<style scoped>
ion-fab-button {
  margin-left: 70px;
  width: 23px;
  height: 23px;
}
</style>
