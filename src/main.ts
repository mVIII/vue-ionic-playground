import { createApp } from 'vue';
import 'reflect-metadata';
import App from './App.vue';
import router from './router';
import Harlem from '@harlem/core';
import createDevtoolsPlugin from '@harlem/plugin-devtools';
import 'reflect-metadata';
import { IonicVue } from '@ionic/vue';

import { container } from 'tsyringe';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MockAuthenticationService from '@/services/mock/Authentication';
import MockCatalogueService from '@/services/mock/Catalogue';

container.register('Authentication', {
  useClass: MockAuthenticationService,
});

container.register('Catalogue', {
  useClass: MockCatalogueService,
});

const plugins = [];
plugins.push(
  createDevtoolsPlugin({
    label: 'State',
  })
);

const app = createApp(App)
  .use(Harlem, { plugins })
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
