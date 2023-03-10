import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AfterGameAction from '../../actions/afterGameActions';
import locale from '../../utils/i18n/language';
// const coins = require('../../images/telecoins_single.png');
const coins = require('../../../../assets/utilities/coins/telecoins_single.png');

const ContinueSign = ({ startSending, playAgain, lang }) =>
  (
    <View style={styles.warpperStyle}>
      <Text style={styles.textStyle}>{locale(lang, 'continue')}</Text>
      <View style={[styles.warpperStyle, { flexDirection: 'row' }]}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              paddingVertical: 12,
              backgroundColor: '#F45B69',
            },
          ]}
          onPress={startSending}
        >
          <Text style={styles.buttonText}>NO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={playAgain}
        >
          <Text style={styles.buttonText} >YES +10s at </Text>
          <Image source={coins} style={styles.imageStyle} />
          <Text style={styles.buttonText} > 8</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 32,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    marginBottom: 6,
    fontFamily: 'PixelOperator8-Bold',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#59C197',
    marginHorizontal: 10,
    ...shadow,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'PixelOperatorSC-Bold',
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    startSending: AfterGameAction.startSending,
  }, dispatch);

export default connect(null, mapDispatchToProps)(ContinueSign);
