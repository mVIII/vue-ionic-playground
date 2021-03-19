<template>
  <navigation />
  <ion-router-outlet id="main" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/Navigation.vue';
import { IonRouterOutlet } from '@ionic/vue';

export default defineComponent({
  name: 'Basic',
  components: {
    Navigation,
    IonRouterOutlet,
  },
});
</script>
