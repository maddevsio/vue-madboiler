import { createApp } from 'vue';
import { Integrations } from '@sentry/tracing';
import * as Sentry from '@sentry/vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import i18n from '@/locales';

import config from '@/config';

import '@/assets/scss/index.scss';
import 'mdb-vue-ui-kit/css/mdb.min.css';

if (config.SENTRY_DNS && process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: config.SENTRY_DNS,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    ignoreErrors: ['ResizeObserver loop limit exceeded']
  });
}

createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .mount('#app');
