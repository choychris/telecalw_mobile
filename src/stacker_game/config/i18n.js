const allStrings = {
  play: {
    en: 'Play',
    zhHant: '開始',
  },
  buyCoin: {
    en: 'Buy\nCoins',
    zhHant: '買金幣',
  },
  weeklyWin: {
    en: 'Weekly\nWins',
    zhHant: '本週得獎',
  },
  how: {
    en: 'How to\nPlay',
    zhHant: '玩法',
  },
  bigPrize: {
    en: 'Major Prize!',
    zhHant: '大獎!',
  },
  wins: {
    en: 'Wins of this Week',
    zhHant: '本週得獎!',
  },
  prompt: {
    en: 'Win Win Win! Fantastic!',
    zhHant: '勝利! 勝利! 勝利! 太棒了!',
  },
  congrat: {
    en: 'Congratulations!!!!\nBiggest Prize Acquired!!!\nOne more WIN?!!',
    zhHant: '贏了大獎啊!恭喜!!!\n要贏多一次嗎?!',
  },
  soClose: {
    en: 'Just sooo Close!\nOne More Try?',
    zhHant: '就差一點了!\n試多一次嗎?',
  },
  start: {
    en: "Let's STACK it!",
    zhHant: '上吧!',
  },
  miniWin: {
    en: 'YEAH!\nFirst Prize WIN!',
    zhHant: 'YEAH!\n贏了第一關!',
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

