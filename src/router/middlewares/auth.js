import Vue from 'vue';
import LocalStorageService from '@/services/localStorageService';

const localStorageService = LocalStorageService.installService();

export default function auth({ to, next, store, nextMiddleware }) {
  Vue.nextTick(() => {
    store.dispatch('auth/addUrlTo', to.path);
    if (
      localStorageService.getAccessToken() !== null &&
      typeof localStorageService.getAccessToken() === 'string'
    ) {
      return nextMiddleware();
    }
    return next({
      path: 'login'
    });
  });
}
