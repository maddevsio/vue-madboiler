import { createI18n } from 'vue-i18n';
import en from '@/locales/en';
import ru from '@/locales/ru';

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set locale
  messages: { en, ru }
});

export default i18n;
