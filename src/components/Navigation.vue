<template>
  <!---HEADER--->
  <ion-header class="ion-hide-md-up">
    <ion-toolbar>
      <ion-title>{{ router.currentRoute.value.name?.toString() }}</ion-title>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!---MENU--->
  <ion-menu
    side="start"
    menu-id="first"
    content-id="main"
    class="ion-hide-md-up"
  >
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Start Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="route in routes" :key="route.name">
          <ion-icon :icon="route.meta.icon" slot="start" />
          <ion-label>{{ route.meta.displayName }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router, { routes } from '@/router';
import {
  IonIcon,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  menuController,
} from '@ionic/vue';

export default defineComponent({
  name: 'Basic',
  components: {
    IonLabel,
    IonIcon,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
  },
  methods: {
    isCurrentRoute(routeName: string) {
      return routeName == router.currentRoute.value.name?.toString();
    },
    openFirst() {
      menuController.enable(true, 'first');
      menuController.open('first');
    },
  },
  setup() {
    return {
      router,
      routes,
    };
  },
});
</script>
