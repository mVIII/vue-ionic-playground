import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { home, book, cart } from 'ionicons/icons';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Tab1.vue'),
    meta: { displayName: 'Home', icon: home },
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    component: () => import('@/views/Tab2.vue'),
    meta: { displayName: 'Catalogue', icon: book },
  },
  {
    path: '/suppliers',
    name: 'supliers',
    component: () => import('@/views/Tab3.vue'),
    meta: { displayName: 'Suppliers', icon: cart },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('@/layouts/basic.vue'),
      children: [...routes],
    },
  ],
});

function goTo(name: string) {
  router.push({ name: name });
}

export default router;
export { routes, goTo };
