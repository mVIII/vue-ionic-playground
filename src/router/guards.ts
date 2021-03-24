import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { container } from 'tsyringe';

import AuthStore from '@/stores/authStore';

export const authenticatedGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = container.resolve(AuthStore);

  authStore.setStateIfCookieExists();

  if (to.name !== 'login') {
    if (!authStore.IsAthenticated()) {
      return next({ name: 'login' });
    } else {
      return next();
    }
  } else {
    if (authStore.IsAthenticated()) {
      return next({ name: 'home' });
    } else {
      return next();
    }
  }
};
