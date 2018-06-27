import React, { Component } from 'react';
import { Easing, Animated, View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const star1 = require('../../../assets/background/stars1.png');
const star2 = require('../../../assets/background/stars2.png');
const star3 = require('../../../assets/background/stars3.png');

const starsImages = [
  star1,
  star2,
  star3,
];

class StarsImage extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0.2);
  }
  componentDidMount() {
    Animated.loop(Animated.sequence([
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this.animation, {
        toValue: 0.2,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])).start();
  }
  shouldComponentUpdate() {
    return false;
  }
  opacityAnimation() {
    return {
      opacity: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }
  render() {
    const starsSetting = starsImages[Math.floor(Math.random() * 3)];
    return (
      <View style={styles.container}>
        <Animated.Image
          source={starsSetting}
          style={[styles.image, this.opacityAnimation()]}
          resizeMode="cover"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default connect(null, null)(StarsImage);
