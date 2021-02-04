import Vue from 'vue';
// NOTE: Add a valid dns and uncomment the code below
// import { Integrations } from '@sentry/tracing';
// import * as Sentry from '@sentry/vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import i18n from '@/locales';
import vuetify from '@/plugins/vuetify';

import '@/assets/scss/index.scss';

Vue.config.productionTip = false;

// NOTE: Add a valid dns and uncomment the code below
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//   Sentry.init({
//     Vue,
//     dsn: '...',
//     integrations: [
//       new Integrations.BrowserTracing()
//     ],
//     tracesSampleRate: 1.0
//   });
// }

const app = new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
});

app.$mount('#app');
