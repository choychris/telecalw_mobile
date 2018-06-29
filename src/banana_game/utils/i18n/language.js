import en from './en';
import zhHant from './zhHant';

const translate = {
  en,
  zhHant,
};

const changeLocale = {
  en: 'en',
  zhHant: 'zhHant',
  'en-zh': 'en',
  'zh-hant-hk': 'zhHant',
  'zh-hk': 'zhHant',
  'zh-hant': 'zhHant',
};

const locale = (original, text) => {
  const available = changeLocale[original] ? changeLocale[original] : 'en';
  return translate[available][text];
};

export default locale;

