import en from './locale/en';
const languages = { en };

export function languageSetting(locale){
	return (languages[locale]) ? languages[locale] : languages['en'] ;
}
