import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { loadI18nTranslations } from './loadMessages';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
 
  return {
    locale,
    messages: await loadI18nTranslations(locale)
  };
});