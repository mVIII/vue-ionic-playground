<template>
  <!--- MOBILE HEADER--->
  <ion-split-pane when="md" content-id="main">
    <ion-header class="ion-hide-md-up">
      <ion-toolbar>
        <ion-title>{{ currentRoute() }}</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <!---MENU--->
    <ion-menu side="start" menu-id="first" class="ion-menu" content-id="main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Start Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item
            class="ion-menu-item"
            v-for="route in routes"
            :key="route.name"
            :class="{ active: currentRoute() === route.name }"
            @click="goto(route.name)"
          >
            <ion-icon :icon="route.meta.icon" slot="start" />
            <ion-label>{{ route.meta.displayName }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main" />
  </ion-split-pane>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router, { routes, goTo, currentRoute } from '@/router';
import {
  IonSplitPane,
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
  IonRouterOutlet,
  menuController,
} from '@ionic/vue';

export default defineComponent({
  name: 'Basic',
  components: {
    IonRouterOutlet,
    IonSplitPane,
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
      return routeName == currentRoute();
    },
    openFirst() {
      menuController.enable(true, 'first');
      menuController.open('first');
    },
    goto(location: string) {
      console.log(location)
      goTo(location);
      menuController.close('first');
    },
  },
  setup() {
    return {
      router,
      routes,
      currentRoute,
    };
  },
});
</script>

<style scoped>
.ion-menu {
  max-width: 300px;
}

.ion-menu-item:hover {
  --background: #36454f;
  cursor: pointer;
}

.active {
  --background: #36454f;
}
</style>
