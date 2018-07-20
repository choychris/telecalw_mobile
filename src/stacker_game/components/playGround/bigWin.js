import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Easing,
} from 'react-native';
import min from 'lodash/min';
// import max from 'lodash/min';

const ticket = require('../../../../assets/utilities/ticket.png');

const MONEY_DIMENSIONS = { width: 50, height: 49 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 25;
const amplitude = MONEY_DIMENSIONS.width / 5;
const randomize = num => Math.random() * num;
const randLeft = randomize(SCREEN_DIMENSIONS.width - MONEY_DIMENSIONS.width) - WIGGLE_ROOM;

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
    const { i, count, second } = this.props;
    const delay = second ? 2 : 1;
    const flip = Animated.timing(
      this.flipping,
      {
        toValue: 1,
        duration: 1000,
        delay: delay * randomize(1000),
        easing: Easing.linear,
        useNativeDriver: true,
      },
    );
    const fall = Animated.timing(
      this.falling,
      {
        toValue: 1,
        duration: 3000,
        delay: delay * i * (3000 / count),
        easing: Easing.poly(1.7),
        // easing: Easing.linear,
        useNativeDriver: true,
      },
    );
    const swing = Animated.timing(
      this.swinging,
      {
        toValue: 1,
        duration: 1000,
        delay: delay * randomize(1000),
        easing: Easing.linear,
        // easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: true,
      },
    );
    const loopFlip = Animated.loop(flip);
    const loopSwing = Animated.loop(swing);
    Animated.parallel([fall, loopFlip, loopSwing]).start();
  }

  render() {
    const { second } = this.props;
    const left = second ?
      randLeft :
      min(randLeft + 200, (SCREEN_DIMENSIONS.width - MONEY_DIMENSIONS.width) - WIGGLE_ROOM);
    const rotateX = this.flipping.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const backRotateX = this.flipping.interpolate({
      inputRange: [0, 1],
      outputRange: ['-180deg', '180deg'],
    });
    const translateX = this.swinging.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-amplitude, 0, -amplitude],
    });
    const rotate = this.swinging.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['7deg', '-7deg', '7deg'],
    });
    const swingY = this.swinging.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-amplitude * 0.8, 0, -amplitude * 0.8],
    });
    const translateY = this.falling.interpolate({
      inputRange: [0, 1],
      outputRange: [-MONEY_DIMENSIONS.height - WIGGLE_ROOM, SCREEN_DIMENSIONS.height + WIGGLE_ROOM],
    });
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
            left,
          },
        ]}
      >
        <Animated.Image
          source={ticket}
          style={[
            styles.imageStyle,
            {
              transform: [
                { rotateX: backRotateX },
                { rotate: '225deg' },
                { translateY: swingY },
              ],
              position: 'absolute',
            },
          ]}
        />
        <Animated.Image
          source={ticket}
          style={[
            styles.imageStyle,
            {
              transform: [
                { rotateX },
                { rotate: '45deg' },
                { translateY: swingY },
              ],
              position: 'absolute',
            },
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
    zIndex: 3,
  },
  imageStyle: {
    backfaceVisibility: 'hidden',
    width: MONEY_DIMENSIONS.width,
    height: MONEY_DIMENSIONS.height,
  },
});

export default BigWin;
