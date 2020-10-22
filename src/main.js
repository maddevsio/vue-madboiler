import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import i18n from '@/locales';

import '@/assets/scss/index.scss';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
});

app.$mount('#app');
