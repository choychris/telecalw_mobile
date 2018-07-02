import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Config from '../../utils/config';

const banana = require('../../images/bananaStand.png');

const { horizontalScale, verticalScale } = Config;
const says = "You're Awesome !";
const EncourageWord = () =>
  (
    <View style={styles.container}>
      <Image
        source={banana}
        style={styles.imageStyle}
      />
      <View style={styles.textWrapper}>
        <View style={styles.borderView}>
          <Text style={styles.textStyle}>{says}</Text>
        </View>
      </View>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: horizontalScale(70),
    height: verticalScale(70),
  },
  textWrapper: {
    alignSelf: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  borderView: {
    alignSelf: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    marginVertical: 3,
  },
  textStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
});

export default EncourageWord;
