import React, { Component } from 'react';
import { StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

const moon = require('../../../../assets/planet/moon.png');

const { height } = Dimensions.get('window');

class Planet extends Component {
  constructor(props) {
    super(props);
    this.spinAnimation = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.loop(Animated.timing(
      this.spinAnimation,
      {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    )).start();
  }
  shouldComponentUpdate() {
    return false;
  }
  spinAction() {
    const spin = this.spinAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return {
      transform: [{ rotate: spin }],
    };
  }
  render() {
    return (
      <Animated.Image
        source={moon}
        style={[
          styles.planet,
          this.spinAction(),
        ]}
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  planet: {
    position: 'absolute',
    width: 460,
    top: height * 0.155,
  },
});

export default connect(null, null)(Planet);
