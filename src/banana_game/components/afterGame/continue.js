import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AfterGameAction from '../../actions/afterGameActions';

const coins = require('../../images/telecoins_single.png');

const ContinueSign = ({ startSending, playAgain }) =>
  (
    <View style={styles.warpperStyle}>
      <Text style={styles.textStyle}>Continue?</Text>
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

const styles = StyleSheet.create({
  warpperStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 40,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
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
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    startSending: AfterGameAction.startSending,
  }, dispatch);

export default connect(null, mapDispatchToProps)(ContinueSign);
