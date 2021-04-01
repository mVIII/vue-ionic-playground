<template>
  <ion-split-pane when="md" content-id="main">
    <!---MENU--->
    <ion-menu side="start" menu-id="first" class="ion-menu" content-id="main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>NORMA</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item
            @click="goto('home')"
            :class="{ active: currentRoute().name === 'home' }"
          >
            <ion-icon :icon="home" slot="start" />
            <ion-label>Home</ion-label>
          </ion-item>
          <ion-item
            @click="goto('catalogues')"
            :class="{ active: currentRoute().name === 'catalogues' }"
          >
            <ion-icon :icon="book" slot="start" />
            <ion-label>Catalogue</ion-label>
          </ion-item>
          <ion-item
            @click="goto('suppliers')"
            :class="{ active: currentRoute().name === 'suppliers' }"
          >
            <ion-icon :icon="cart" slot="start" />
            <ion-label>Suppliers</ion-label>
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
    <!---OUTLET--->
    <ion-router-outlet id="main" />
  </ion-split-pane>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router, { currentRoute,goTo } from '@/router';
import { logOut, home, book, cart } from 'ionicons/icons';
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
      goTo(location);
      menuController.close('first');
    },
  },
  setup() {
    const { logout } = useAuth();

    return {
      logOut,
      home,
      book,

      cart,
      logout,
      router,
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
