const allStrings = {
  expires: {
    en: 'Expires',
    zhHant: '到期日',
  },
  select: {
    en: 'Select',
    zhHant: '選取',
  },
  pending: {
    en: 'Pending',
    zhHant: '待處理',
  },
  sent: {
    en: 'Shipped',
    zhHant: '已寄出',
  },
  details: {
    en: 'Details',
    zhHant: '更多',
  },
  status: {
    en: 'Status',
    zhHant: '狀態',
  },
  others: {
    en: 'To Others',
    zhHant: '給朋友',
  },
  myself: {
    en: 'To Myself',
    zhHant: '給自己',
  },
  getTicket: {
    en: 'Get Tickets',
    zhHant: '換取獎票',
  },
  yes: {
    en: 'Confirm',
    zhHant: '確定',
  },
  no: {
    en: 'No',
    zhHant: '否',
  },
  acquire: {
    en: 'Acquire Prize',
    zhHant: '換領獎品',
  },
  prizeDetails: {
    en: 'Prize\nDetails',
    zhHant: '獎品\n資料',
  },
  desc: {
    en: 'Description:',
    zhHant: '獎品描述:',
  },
};

const Strings = (locale, word) => {
  const languages = {
    en: 'en',
    zhHant: 'zhHant',
    'en-zh': 'en',
    'zh-hant-hk': 'zhHant',
    'zh-hk': 'zhHant',
    'zh-hant': 'zhHant',
  };
  const lang = (languages[locale]) ? languages[locale] : languages.en;
  return allStrings[word][lang];
};

export default Strings;

