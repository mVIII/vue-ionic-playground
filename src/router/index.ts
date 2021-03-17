import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1',
    name: 'Main',
  },
  {
        path: '/tabs/tab1',
        name: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: '/tabs/tab2',
        name: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: '/tabs/tab3',
        name: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
export { routes };
