import {getRequestConfig} from 'next-intl/server';
import { getPrefs } from '../lib/prefsStores';

 
export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const prefs = getPrefs()
  const locale = prefs.language 
  
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});