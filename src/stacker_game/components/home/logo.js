import React from 'react';
import { Image, Animated, StyleSheet } from 'react-native';
import Config from '../../config/constants';

const logo = require('../../images/logo.png');


const StackerLogo = ({ translateX, translateY }) => (
  <Animated.View
    style={[
      styles.container,
      {
        transform: [
          { translateX },
          { translateY },
        ],
      },
    ]}
  >
    <Image
      source={logo}
      style={styles.imageStyle}
    />
  </Animated.View>
);

const { width } = Config;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 10,
    ...Config.shadow,
    zIndex: 3,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: width - 40,
    height: width * 0.4,
  },
});

export default StackerLogo;
