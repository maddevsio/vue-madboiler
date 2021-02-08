import Vue from 'vue';
import { Integrations } from '@sentry/tracing';
import * as Sentry from '@sentry/vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import i18n from '@/locales';
import vuetify from '@/plugins/vuetify';

import config from '@/config';

import '@/assets/scss/index.scss';

Vue.config.productionTip = false;

if (config.SENTRY_DNS && process.env.NODE_ENV !== 'development') {
  Sentry.init({
    Vue,
    dsn: config.SENTRY_DNS,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    ignoreErrors: ['ResizeObserver loop limit exceeded']
  });
}

const app = new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
});

app.$mount('#app');
