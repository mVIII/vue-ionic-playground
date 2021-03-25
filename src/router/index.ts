import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { authenticatedGuard } from './guards';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/catalogues',
    name: 'catalogues',
    component: () =>
      import(
        /* webpackChunkName: "catalogues" */ '@/views/catalogue/Catalogues.vue'
      ),
  },
  {
    path: '/catalogues/:id',
    name: 'catalogue',
    component: () =>
      import(
        /* webpackChunkName: "catalogue" */ '@/views/catalogue/Catalogue.vue'
      ),
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import('@/views/Tab3.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    },
    {
      path: '',
      component: () =>
        import(/* webpackChunkName: "basic-layout" */ '@/layouts/basic.vue'),
      redirect: '/home',
      children: [...routes],
    },
  ],
});

router.beforeEach(authenticatedGuard);

function currentRoute() {
  return router.currentRoute.value;
}

function goTo(name: string) {
  router.push({ name: name });
}

export default router;
export { routes, goTo, currentRoute };
