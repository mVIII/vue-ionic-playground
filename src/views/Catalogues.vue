<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="catalogue in catalogues" :key="catalogue.name">
          <ion-label>{{ catalogue.name }}</ion-label>
          <ion-badge color="secondary" slot="end">{{
            catalogue.items.length
          }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonList,
  IonContent,
  IonLabel,
  IonBadge,
  IonItem,
} from '@ionic/vue';

export default {
  name: 'Catalogues',
  components: {
    IonLabel,
    IonBadge,
    IonItem,
    IonList,
    IonContent,
    IonPage,
  },

  setup() {
    type Item = {
      name: string;
    };

    type Catalogue = {
      name: string;
      items: Item[];
    };

    const catalogues: Catalogue[] = [
      {
        name: 'Wines',
        items: [
          {
            name: 'Beaucastel (Château)',
          },
          {
            name: 'Cheval Blanc (Château)',
          },
          {
            name: 'Corton-Charlemagne',
          },
          {
            name: 'Dom Pérignon',
          },
          {
            name: 'Ducru-Beaucaillou (Château)',
          },
        ],
      },
      {
        name: 'Fish',
        items: [
          {
            name: 'Anchovy',
          },
          {
            name: 'Carp',
          },
          {
            name: 'Bobby',
          },
          {
            name: 'Bluefin Tuna',
          },
          {
            name: 'Salmon',
          },
          {
            name: 'Catafish',
          },
          {
            name: 'Hammerhead shark',
          },
          {
            name: 'Clownfish',
          },
        ],
      },
      {
        name: 'Vegetables',
        items: [
          {
            name: 'Tomatos',
          },
          {
            name: 'Cellery',
          },
          {
            name: 'Potatos',
          },
          {
            name: 'Onions',
          },
          {
            name: 'Eggplants',
          },
          {
            name: 'Raddish',
          },
          {
            name: 'Green Onions',
          },
        ],
      },
      {
        name: 'Meat',
        items: [
          {
            name: 'Jamón ibérico',
          },
          {
            name: 'Sirloin(Prime)',
          },
          {
            name: 'Sirloin(Choise)',
          },
          {
            name: 'Tomahwk(Choice)',
          },
          {
            name: 'Brisket(Prime)',
          },
          {
            name: 'Ribeye(Wagyu A5)',
          },
        ],
      },
      {
        name: 'Legumes',
        items: [
          {
            name: 'Cheakpeas',
          },
          {
            name: 'Lentils',
          },
          {
            name: 'Green beans',
          },
          {
            name: 'Beans',
          },
          {
            name: 'Fava',
          },
        ],
      },
    ];

    return { catalogues };
  },
};
</script>
