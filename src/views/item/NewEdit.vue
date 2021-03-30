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
      <div class="item-avatar">
        <img
          class="item-image"
          src="https://www.houseofwine.gr/how/media/catalog/product/cache/1/image/600x600/9df78eab33525d08d6e5fb8d27136e95/b/0/b0089_estrella_inedit.jpg"
        />
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="setImageActionSheetOpen(true)">
            <ion-icon :icon="cameraOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
    </div>
    <ion-list lines="full" class="ion-no-margin">
      <ion-list-header lines="full">
        <ion-label>
          {{ title }}
        </ion-label>
      </ion-list-header>
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input placeholder="Name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Description</ion-label>
        <ion-input placeholder="Description"></ion-input>
      </ion-item>
    </ion-list>
    <ion-button expand="block">Add</ion-button>
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
  IonIcon,
  IonFab,
} from '@ionic/vue';
import { cameraOutline } from 'ionicons/icons';
import { Catalogue, Item } from '@/types';
import { PropType } from '@vue/runtime-core';
import { ref } from 'vue';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
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
    IonIcon,
    IonFab,
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
    const title = props.item.name === '' ? 'New Item' : props.item.name;

    const itemRef = ref<Item>(props.item);

    const addImageIcon = '';

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
        quality: 100,
        allowEditing: true,
        source: CameraSource.Prompt,
        resultType: CameraResultType.Uri,
      });

      const imageUrl = image.webPath;
      if (imageUrl) {
        itemRef.value.image = imageUrl;
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
      cameraOutline,
      itemRef,
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
  border: 1px solid grey !important;
  border-radius: 100px;
  max-width: 135px;
  max-height: 135px;
  margin: 5px;
}
.item-avatar {
  position: relative;
}
.container {
  margin: 10px;
  width: 100%;
  display: flex;

  justify-content: space-evenly;
}

ion-fab-button {
  width: 36px;
  height: 36px;
}
</style>
