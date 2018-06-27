import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import Config from '../../../utils/config';

// const coins = require('../../../images/telecoins_single.png');
const coins = require('../../../../../assets/utilities/coins/telecoins_single.png');

const PlayButton = ({ requiredCoin, text, onPress }) =>
  (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <View style={styles.rowContainer}>
        <Image source={coins} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{requiredCoin}</Text>
      </View>
      <Text style={styles.startText}>{text}</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E0CF18',
    paddingVertical: 15,
    borderRadius: 50,
    ...Config.shadow,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 5,
    // borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PixelOperator8-Bold',
    // borderWidth: 1,
  },
  startText: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'PixelOperator8-Bold',
  },
});

export default PlayButton;
