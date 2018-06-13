import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';

const orbitImg = require('../../../../../assets/planet/orbit.png');

const { width } = Dimensions.get('window');

class Orbit extends Component {
  componentWillMount() {
    this.spinAnimation = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.loop(Animated.timing(
      this.spinAnimation,
      {
        toValue: 1,
        duration: 50000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    )).start();
  }
  shouldComponentUpdate() {
    return false;
  }
  orbitSpinAnimation() {
    const spin = this.spinAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-360deg'],
    });
    return {
      transform: [{ rotate: spin }],
    };
  }
  render() {
    return (
      <Animated.Image
        source={orbitImg}
        style={[styles.image, this.orbitSpinAnimation()]}
        resizeMode="contain"
      />
    );
  }
}

const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    height: isIOS ? width : width * 0.95,
    width: isIOS ? width : width * 0.95,
  },
});


export default connect(null, null)(Orbit);
