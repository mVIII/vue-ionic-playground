<template>
  <ion-app>
    <ion-page>
      <ion-split-pane name="d" when="md" content-id="main">
        <ion-menu content-id="main">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Menu Header</ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <ion-list>
              <ion-list-header>
                List header
              </ion-list-header>
              <ion-menu-toggle auto-hide="false">
                <ion-item
                  button
                  v-for="route in routes"
                  :key="route.name"
                  :RouteRecord="route"
                >
                  <ion-icon slot="start" :icon="home"></ion-icon>
                  <ion-label>
                    {{ route.name }}
                  </ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-router-outlet id="main" />
      </ion-split-pane>
    </ion-page>
    <tabs class="ion-hide-md-up" />
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonContent,
  IonMenu,
  IonItem,
  IonIcon,
  IonList,
  IonMenuToggle,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { routes } from '@/router';
import { home } from 'ionicons/icons';
import Tabs from '@/views/Tabs.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonPage,
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonContent,
    IonMenu,
    IonItem,
    IonIcon,
    IonList,
    IonMenuToggle,
    IonLabel,
    Tabs,
  },
  setup() {
    return {
      home,
      routes,
    };
  },
});
</script>
