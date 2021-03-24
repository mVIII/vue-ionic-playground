<template>
  <!--- MOBILE HEADER--->
  <ion-split-pane when="md" content-id="main">
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
            :class="{ active: currentRoute().name === route.name }"
            @click="goto(route.name)"
          >
            <ion-icon :icon="route.meta.icon" slot="start" />
            <ion-label>{{ route.meta.displayName }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-footer class="bar-stable">
        <ion-item @click="logout()">
          <ion-icon :icon="logOut" slot="start" />
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-footer>
    </ion-menu>

    <ion-router-outlet id="main" />
  </ion-split-pane>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { routes, goTo, currentRoute } from '@/router';
import { logOut } from 'ionicons/icons';
import { useAuth } from '@/composables/useAuth';
import {
  IonSplitPane,
  IonIcon,
  IonLabel,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
  menuController,
  IonFooter,
} from '@ionic/vue';

export default defineComponent({
  name: 'Basic',
  components: {
    IonRouterOutlet,
    IonSplitPane,
    IonLabel,
    IonIcon,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonFooter,
  },
  methods: {
    isCurrentRoute(routeName: string) {
      return routeName == currentRoute().name;
    },
    openFirst() {
      menuController.enable(true, 'first');
      menuController.open('first');
    },
    goto(location: string) {
      console.log(location);
      goTo(location);
      menuController.close('first');
    },
  },
  setup() {
    const { logout } = useAuth();

    return {
      logOut,
      logout,
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
