<template>
  <ion-header class="ion-hide-md-up">
    <ion-toolbar>
      <ion-title>Filters</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="$emit('dismiss')">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <div v-for="filterView in filterViews" :key="filterView.name">
      <ion-list-header>{{ filterView.name }}</ion-list-header>
      <!---ENUM TYPE--->
      <p v-if="filterView.type === 2">
        <ion-chip
          v-for="enumVal in filterView.enum"
          :key="enumVal"
          :color="['red','rose','white'][Math.floor(Math.random()*3)]"
          @click="toogleEnumValue(filterView.name, enumVal)"
        >
          <ion-label>{{ enumVal }}</ion-label>
          <ion-icon
            v-if="filterView.value.includes(enumVal)"
            :icon="close"
          ></ion-icon>
        </ion-chip>
      </p>
    </div>
    <ion-list-header>Price</ion-list-header>
    <ion-range min="0" max="1000" pin color="secondary">
      <ion-label size="small" slot="start" name="sunny">0</ion-label>
      <ion-label slot="end" name="sunny">1000</ion-label>
    </ion-range>

    <ion-button expand="block" @click="applyFilter()">Apply</ion-button>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonButton,
  IonListHeader,
  IonChip,
  IonLabel,
  IonRange,
  IonIcon,
} from '@ionic/vue';

import { ref } from 'vue';
import { close } from 'ionicons/icons';
import { Aggregation, AggregationType, Filter } from '@/services/dtos/';
import { PropType, SetupContext } from '@vue/runtime-core';
import { Catalogue, FieldTypes, FieldView } from '@/types';
import { fieldViewsFromSchema } from '@/utils';
export default {
  name: 'ItemsFilter',
  components: {
    IonRange,
    IonButtons,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonListHeader,
    IonChip,
    IonLabel,
    IonIcon,
  },
  emits: ['dismiss', 'apply'],
  props: {
    itemFilter: {
      type: Object as PropType<Filter>,
      default: { aggregations: [] },
    },
    catalogue: {
      type: Object as PropType<Catalogue>,
      default: { id: '', name: '', itemCount: 0, ItemSchema: [] },
    },
  },
  setup(
    props: any,
    context: SetupContext<('dismiss' | 'apply')[]>
  ): Record<string, unknown> {
    //const filter: ItemFilter = ref<ItemFilter>({ catalogue: '' });

    const selectedCatalogue = ref<Catalogue>(props.catalogue);
    const itemFilter = props.itemFilter as Filter;
    const filterViews = ref<FieldView[]>([]);

    //TODO REFACTOR ASAP
    //ONE FILTER FOR EACH SCHEMA ITEM
    filterViews.value = fieldViewsFromSchema(
      selectedCatalogue.value.ItemSchema
    );
    //CHANGE DEFAULT FILTER VALUE TO MATCH THE ITEM FILTER
    itemFilter.aggregations.forEach((aggregation) => {
      const f = filterViews.value.find((field) => {
        return field.name === aggregation.field.name;
      });
      if (!f) {
        console.log('NotFound Initial');
        return;
      }
      f.value = aggregation.query;
    });

    const toogleBooleanField = (name: string) => {
      const fview = filterViews.value.find((filterView) => {
        return filterView.name === name;
      });
      if (!fview) {
        console.log('NotFound');
        return;
      }
      (fview.value as boolean) = !fview.value;
    };

    const toogleEnumValue = (name: string, val: string) => {
      const fview = filterViews.value.find((filterView) => {
        return filterView.name === name;
      });
      if (!fview) {
        console.log('NotFound');
        return;
      }
      if ((fview.value as string[]).includes(val)) {
        fview.value = (fview.value as string[]).filter((filter) => {
          return filter !== val;
        });
      } else {
        (fview.value as string[]).push(val);
      }
    };

    const setFilterValue = (name: string, val: string | number) => {
      const fview = filterViews.value.find((filterView) => {
        return filterView.name === name;
      });
      if (!fview) {
        console.log('NotFound');
        return;
      }
      fview.value = val;
    };

    const applyFilter = () => {
      const aggregations = filterViews.value
        .map((fview) => {
          return {
            query: fview.value,
            type: AggregationType.eq,
            field: {
              name: fview.name,
              type: fview.type,
              enum: fview.enum,
            },
          };
        })
        .map((aggregation) => {
          //REMOVE DEFAULT
          switch (aggregation.field.type) {
            case FieldTypes.String:
              return (aggregation.query as string) === '' ? null : aggregation;
            case FieldTypes.Enum:
              return (aggregation.query as string[]).length === 0
                ? null
                : aggregation;
            default:
              return aggregation;
          }
        })
        .filter((v) => v) as Aggregation[];
      const newItemFilter: Filter = {
        aggregations: aggregations,
      };
      context.emit('apply', newItemFilter);
    };

    return {
      applyFilter,
      toogleBooleanField,
      toogleEnumValue,
      setFilterValue,
      filterViews,
      selectedCatalogue,
      close,
    };
  },
};
</script>
