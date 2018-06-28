import React from 'react';
import { Image, View, StyleSheet, Animated } from 'react-native';
import Config from '../../utils/config';

const FlyBot = require('../../images/flyBot.png');

const { horizontalScale, verticalScale } = Config;

const FlyDisplay = ({ reminingTime }) => {
  const colorAnimate = new Animated.Value(0);
  if (reminingTime > 0 && reminingTime <= 5) {
    startAnimation();
  }
  function startAnimation() {
    colorAnimate.setValue(0);
    Animated.timing(
      colorAnimate,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      },
    ).start(startAnimation);
  }

  const color = colorAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', 'rgb(169,63,85)'],
  });
  return (
    <View style={styles.container}>
      <Image
        source={FlyBot}
        style={styles.imageStyle}
      />
      <Animated.Text
        style={[styles.textStyle, { color }]}
      >
        {reminingTime} s
      </Animated.Text>
    </View>
  );
};

const fontSize = horizontalScale(40);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    position: 'absolute',
    width: horizontalScale(187.5),
    height: verticalScale(180),
  },
  textStyle: {
    textAlign: 'center',
    fontSize,
    borderRadius: 10,
    borderWidth: 4,
    backgroundColor: 'black',
    overflow: 'hidden',
    paddingVertical: 10,
    width: horizontalScale(120),
    fontFamily: 'PixelOperatorSC-Bold',
  },
});

export default FlyDisplay;
