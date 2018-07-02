import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import locale from '../../utils/i18n/language';

const coins = require('../../../../assets/utilities/coins/telecoins_single.png');

const BonusButtons = ({ lang, disable, onPress }) =>
  (
    <View style={styles.warpperStyle}>
      <Text style={styles.textStyle}>
        { locale(lang, 'bonusOffer') }
      </Text>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          { opacity: disable ? 0.4 : 1 },
        ]}
        disabled={disable}
        onPress={() => onPress(true)}
      >
        <Text style={styles.buttonText} >{ locale(lang, 'moreScore') }</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={coins} style={styles.imageStyle} />
          <Text
            style={[
              styles.buttonText,
              { alignSelf: 'center' },
            ]}
          >
            20
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(false)}
        style={[
          styles.buttonStyle,
          { backgroundColor: '#F45B69' },
        ]}
      >
        <Text style={styles.buttonText}>{ locale(lang, 'noThx') }</Text>
      </TouchableOpacity>
    </View>
  );

const shadow = (Platform.OS === 'ios') ?
  {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  } : { elevation: 2 };

const styles = StyleSheet.create({
  warpperStyle: {
    flex: 1.5,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    paddingBottom: 4,
  },
  buttonStyle: {
    borderRadius: 30,
    padding: 8,
    paddingHorizontal: 20,
    marginVertical: 6,
    alignItems: 'center',
    backgroundColor: '#59C197',
    ...shadow,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'PixelOperatorSC-Bold',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
});

export default BonusButtons;

