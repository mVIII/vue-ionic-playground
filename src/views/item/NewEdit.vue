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
    <div class="container">
      <img
        class="item-image"
        :src="imageSrc"
        @click="setImageActionSheetOpen(true)"
      />
    </div>
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
  <ion-action-sheet
    :is-open="imageActionSheetOpen"
    header="Avatar"
    :buttons="imageActionSheet"
  >
  </ion-action-sheet>
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
  IonActionSheet,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { Catalogue, Item } from '@/types';
import { PropType } from '@vue/runtime-core';
import { ref } from 'vue';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

export default {
  name: 'ItemNewEdit',
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
    IonActionSheet,
  },
  emits: ['dismiss', 'save'],
  props: {
    catalogue: {
      type: Object as PropType<Catalogue>,
      default: { id: '', name: '', itemCount: 0, ItemSchema: [] },
    },
    item: {
      type: Object as PropType<Item>,
      default: { id: '', catalogue: '', name: '', fields: [] },
    },
  },
  setup(props: any): Record<string, unknown> {
    const title =
      props.catalogue.name === '' ? 'New Catalogue' : props.catalogue.name;

    const imageSrc = ref<string>(
      'https://www.houseofwine.gr/how/media/catalog/product/cache/1/image/600x600/9df78eab33525d08d6e5fb8d27136e95/b/0/b0089_estrella_inedit.jpg'
    );

    const c = ref<Catalogue>(props.catalogue);

    const imageActionSheetOpen = ref(false);
    const setImageActionSheetOpen = (state: boolean) =>
      (imageActionSheetOpen.value = state);

    type Button = {
      text: string;
      role?: string;
      icon?: string;
      handler: Function;
    };

    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
      const imageUrl = image.webPath;
      if (imageUrl) {
        imageSrc.value = imageUrl;
      }
    };

    const imageActionSheet: Button[] = [
      {
        text: 'Camera',
        handler: async () => {
          await takePicture();
          console.log('succ');
          setImageActionSheetOpen(false);
        },
      },
      {
        text: 'From files',
        handler: () => {
          setImageActionSheetOpen(false);
          console.log('from files');
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          setImageActionSheetOpen(false);
        },
      },
    ];

    return {
      imageSrc,
      add,
      c,
      title,
      imageActionSheet,
      imageActionSheetOpen,
      setImageActionSheetOpen,
    };
  },
};
</script>
<style scoped>
.item-image {
  margin: 10px;
  border: 1px solid grey !important;
  border-radius: 100px;
  max-width: 120px;
  max-height: 120px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
