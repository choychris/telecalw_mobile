import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

const emoji = require('node-emoji');
const banana = require('../../../../banana_game/images/bananaStand.png');
const hand = require('../../../../banana_game/images/hand.png');

class BananaThumbnail extends Component {
  constructor() {
    super();
    this.handAnimate = new Animated.Value(0);
    this.bananaAnimate = new Animated.Value(0);
    this.animate = this.animate.bind(this);
  }
  componentDidMount() {
    this.animate();
  }

  animate() {
    this.handAnimate.setValue(0);
    this.bananaAnimate.setValue(0);
    Animated.timing(
      this.handAnimate,
      {
        toValue: 1,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      },
    ).start();
    Animated.timing(
      this.bananaAnimate,
      {
        toValue: 1,
        duration: 800,
        delay: 2000,
        useNativeDriver: true,
      },
    ).start(this.animate);
    // Animated.sequence([handMove, bananaMove]).start(this.animate);
  }

  render() {
    const rotate = this.bananaAnimate.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: ['0deg', '-15deg', '15deg', '0deg'],
    });
    const translateX = this.handAnimate.interpolate({
      inputRange: [0, 0.5, 0.6, 0.8, 1],
      outputRange: [0, 20, 15, 20, 0],
    });
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.toGame}
      >
        <Text style={styles.textStyle}>
          { `Tap the ${emoji.get('banana')} !`}
        </Text>
        <View>
          <Animated.Image
            source={banana}
            style={[styles.bananaImage, { transform: [{ rotate }] }]}
          />
          <Animated.Image
            source={hand}
            style={[styles.handImage, { transform: [{ translateX }] }]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: 'flex-end',
    borderStyle: 'dashed',
    borderColor: 'grey',
    width: 120,
    height: 120,
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontSize: 22,
    fontFamily: 'PixelOperatorSC-Bold',
    color: 'white',
    textAlign: 'center',
  },
  handImage: {
    position: 'absolute',
    width: 65,
    height: 40,
    resizeMode: 'contain',
    bottom: 0,
  },
  bananaImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
});

export default BananaThumbnail;
