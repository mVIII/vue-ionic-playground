<template>
  <ion-grid>
    <ion-col>
      <ion-row>
        <ion-card v-for="item in items" :key="item.name">
          <ion-card-content>
            <div style="display: flex; justify-content: space-evenly">
              <ion-avatar slot="start">
                <img :src="item.image" />
              </ion-avatar>
            </div>
            <strong>{{ item.name }}</strong>
            <br />
            <strong>{{ item.description }}</strong>
            <br />
          </ion-card-content>
        </ion-card>
      </ion-row>
    </ion-col>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Item } from '@/types';
import { PropType } from '@vue/runtime-core';
import {
  IonCardContent,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
} from '@ionic/vue';
export default defineComponent({
  name: 'ItemGrid',
  components: {
    IonCard,
    IonGrid,
    IonCol,
    IonRow,
    IonCardContent,
    IonAvatar,
  },
  props: {
    displayItems: {
      type: Object as PropType<Item[]>,
      default: [],
    },
  },
  setup(props: any) {
    const items = ref<Item[]>(props.displayItems);
    console.log(items.value);
    return { items };
  },
});
</script>
