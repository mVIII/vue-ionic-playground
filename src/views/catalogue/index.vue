<template>
  <ion-page>
    <ion-router-outlet />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonRouterOutlet, IonPage } from '@ionic/vue';

export default defineComponent({
  name: 'cataloguesRoot',
  components: {
    IonRouterOutlet,
    IonPage,
  },
});
</script>
