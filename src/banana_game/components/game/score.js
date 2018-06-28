import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Animated } from 'react-native';
import Config from '../../utils/config';

const pixelBot = require('../../images/scoreBot.png');
const botSad = require('../../images/botSad.png');

const { horizontalScale, verticalScale } = Config;

class Score extends Component {
  constructor() {
    super();
    this.scaleValue = new Animated.Value(0);
  }

  shouldComponentUpdate(nextProps) {
    const scoreChanged = (this.props.totalScore !== nextProps.totalScore);
    const ascendingChanged = (this.props.ascending !== nextProps.ascending);
    return (scoreChanged || ascendingChanged);
  }

  animate() {
    this.scaleValue.setValue(0);
    Animated.timing(
      this.scaleValue,
      {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    this.animate();
    const scale = this.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1.2, 1],
    });
    const styleGroup = this.props.ascending ? {
      image: pixelBot,
      color: '#FFE66D',
    } : {
      image: botSad,
      color: 'orange',
    };
    const { image, color } = styleGroup;
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.textWrapper, { transform: [{ scale }], borderColor: color }]}>
          <Text
            style={[styles.textStyle, { color }]}
          >
            {this.props.totalScore}
          </Text>
        </Animated.View>
        <Image
          source={image}
          style={styles.imageStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 5,
    borderStyle: 'dashed',
    backgroundColor: 'black',
  },
  textStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: horizontalScale(40),
    width: horizontalScale(120),
    overflow: 'hidden',
    fontFamily: 'PixelOperatorSC-Bold',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: horizontalScale(120),
    height: verticalScale(100),
  },
});

export default Score;
