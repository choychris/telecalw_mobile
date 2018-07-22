import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Config from '../../config/constants';

const logo = require('../../images/logo.png');


const StackerLogo = () => (
  <View
    style={styles.container}
  >
    <Image
      source={logo}
      style={styles.imageStyle}
    />
  </View>
);

const { width } = Config;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 10,
    ...Config.shadow,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: width - 40,
    height: width * 0.4,
  },
});

export default StackerLogo;
