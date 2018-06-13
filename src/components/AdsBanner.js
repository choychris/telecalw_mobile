import React from 'react';
import { AdMobBanner } from 'react-native-admob';
import { Platform } from 'react-native';

const AdsBanner = () => {
  const firstViewAdUnitID = (Platform.OS === 'ios') ? 'ca-app-pub-5094396211239311/2419865850' : 'ca-app-pub-5094396211239311/8392950095';
  return (
    <AdMobBanner
      adSize="banner"
      adUnitID={firstViewAdUnitID}
      onAdLoaded={() => { console.log('ad loaded'); }}
      onAdFailedToLoad={(evt) => { console.log(evt); }}
    />
  );
};

export default AdsBanner;
