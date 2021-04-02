<template>
  <ion-list>
    <ion-item v-for="item in items" :key="item.name">
      <ion-avatar slot="start">
        <img :src="item.image" />
      </ion-avatar>
      <ion-label>
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>
<script lang="ts">
import { Item } from '@/types';
import { PropType } from '@vue/runtime-core';
import { defineComponent, ref } from 'vue';
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/vue';

export default defineComponent({
  name: 'ItemList',
  components: {
    IonAvatar,
    //IonListHeader,
    IonList,
    IonItem,
    IonLabel,
  },
  props: {
    displayItems: {
      type: Object as PropType<Item[]>,
      default: [],
    },
  },
  setup(props: any) {
    const items = ref<Item[]>(props.displayItems);
    return { items };
  },
});
</script>
