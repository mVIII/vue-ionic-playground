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
        <img class="item-image" :src="itemRef.image" />
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="takePicture()">
            <ion-icon :icon="cameraOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
    </div>
    <ion-list lines="full" class="ion-no-margin">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input placeholder="Name" v-model="itemRef.name"></ion-input>
      </ion-item>
      <div v-for="fieldView in fieldViews" :key="fieldView.name">
        <ion-list-header>{{ fieldView.name }}</ion-list-header>
        <!---ENUM TYPE--->
        <p v-if="fieldView.type === 2">
          <ion-chip
            v-for="enumVal in fieldView.enum"
            :key="enumVal"
            :color="enumVal"
            @click="toogleEnumValue(fieldView.name, enumVal)"
          >
            <ion-label>{{ enumVal }}</ion-label>
            <ion-icon
              v-if="fieldView.value === enumVal"
              :icon="checkmark"
            ></ion-icon>
          </ion-chip>
        </p>
      </div>
      <ion-item>
        <ion-label position="stacked">Description</ion-label>
        <ion-input
          placeholder="Description"
          v-model="itemRef.description"
        ></ion-input>
      </ion-item>
    </ion-list>
    <ion-button expand="block" @click="save()">Add</ion-button>
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
  IonIcon,
  IonFab,
  IonFabButton,
  IonChip,
} from '@ionic/vue';
import { cameraOutline, checkmark } from 'ionicons/icons';
import { Catalogue, Item, FieldView } from '@/types';
import { PropType, SetupContext } from '@vue/runtime-core';
import { ref } from 'vue';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera /*Motion*/ } = Plugins;
import { fieldViewsFromSchema } from '@/utils';
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
    IonIcon,
    IonFab,
    IonFabButton,
    IonChip,
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
  setup(
    props: any,
    context: SetupContext<('dismiss' | 'save')[]>
  ): Record<string, unknown> {
    console.log(props.item.name);
    const title =
      props.item.name === '' ? 'New ' + props.catalogue.name : props.item.name;

    const itemRef = ref<Item>(props.item);
    const catalogue = ref<Catalogue>(props.catalogue);

    const fieldViews = ref<FieldView[]>(
      fieldViewsFromSchema(catalogue.value.ItemSchema)
    );

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

    const toogleEnumValue = (name: string, val: string) => {
      const fview = fieldViews.value.find((fieldView) => {
        return fieldView.name === name;
      });
      if (!fview) {
        console.log('NotFound');
        return;
      }
      fview.value = val;
    };

    const save = () => {
      itemRef.value.catalogue = catalogue.value.id;
      fieldViews.value.forEach((field) => {
        itemRef.value.fields.push({
          name: field.name,
          type: field.type,
          value: field.value,
        });
      });
      context.emit('save', itemRef.value);
    };

    return {
      cameraOutline,
      itemRef,
      title,
      takePicture,
      toogleEnumValue,
      fieldViews,
      checkmark,
      save,
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
  min-width: 135px;
  min-height: 135px;
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
