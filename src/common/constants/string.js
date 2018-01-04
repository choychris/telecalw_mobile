import en from './locale/en';
import zhHant from './locale/zhHant';

const languages = { 
	'en' : en ,
	'en-zh' : en,
	'zh-hant-hk' : zhHant,
	'zh-hk' :  zhHant,
	'zh-hant' : zhHant,
	'zhHant' : zhHant
};

export function languageSetting(locale){
	return (languages[locale]) ? languages[locale] : languages['en'] ;
}

export function avaLanguage(){
	return { 
		'en' : 'English',
		'zhHant' : '繁體中文'
	};
}
