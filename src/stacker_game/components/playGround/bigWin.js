import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Easing } from 'react-native';

const ticket = require('../../../../assets/utilities/ticket.png');

const MONEY_DIMENSIONS = { width: 49, height: 49 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 50;
const amplitude = MONEY_DIMENSIONS.width / 5;

const randomize = max => Math.random() * max;

class BigWin extends Component {
  constructor() {
    super();
    this.flipping = new Animated.Value(0);
    this.falling = new Animated.Value(0);
    this.swinging = new Animated.Value(0);
    this.startAnimation = this.startAnimation.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    const flip = Animated.timing(
      this.flipping,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    );
    const fall = Animated.timing(
      this.falling,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.poly(1.7),
        // easing: Easing.linear,
        useNativeDriver: true,
      },
    );
    const swing = Animated.timing(
      this.swinging,
      {
        toValue: 1,
        duration: 700,
        // easing: Easing.linear,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      },
    );
    const loopFlip = Animated.loop(flip);
    const loopSwing = Animated.loop(swing);
    Animated.parallel([fall, loopFlip, loopSwing]).start();
  }

  render() {
    const rotateX = this.flipping.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const translateX = this.swinging.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-amplitude, 0, amplitude],
    });
    const rotate = this.swinging.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['7deg', '0deg', '-7deg'],
    });
    const swingY = this.swinging.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-amplitude * 0.8, 0, -amplitude * 0.8],
    });
    const fallY = this.falling.interpolate({
      inputRange: [0, 1],
      outputRange: [-MONEY_DIMENSIONS.height - WIGGLE_ROOM, SCREEN_DIMENSIONS.height + WIGGLE_ROOM],
    });
    const translateY = Animated.add(swingY, fallY);
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              { translateX },
              { rotate },
              { translateY },
            ],
          },
        ]}
      >
        <Animated.Image
          source={ticket}
          style={[
            styles.imageStyle,
            { transform: [{ rotateX }] },
          ]}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: WIGGLE_ROOM,
    left: randomize(SCREEN_DIMENSIONS.width - MONEY_DIMENSIONS.width) - WIGGLE_ROOM,
  },
  imageStyle: {
    backfaceVisibility: 'hidden',
    width: MONEY_DIMENSIONS.width,
    height: MONEY_DIMENSIONS.height,
  },
});

export default BigWin;
