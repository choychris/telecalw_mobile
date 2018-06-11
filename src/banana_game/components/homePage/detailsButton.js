import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, Image, StyleSheet, Animated } from 'react-native';
import Config from '../../utils/config';

const banana = require('../../images/thumbnail.png');
const dialog = require('../../images/bubble.png');

const { horizontalScale } = Config;

const speak = 'Welcome to MY Game :D \n \nBefore you start, click here to learn the details.';
class DetailsButton extends Component {
  constructor() {
    super();
    this.animateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animateValue.setValue(0);
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 800,
        delay: 2000,
        useNativeDriver: true,
      },
    ).start(() => this.animate());
  }

  render() {
    const bouncing = this.animateValue.interpolate({
      inputRange: [0, 0.2, 0.4, 0.43, 0.8, 0.9, 1],
      outputRange: [0, 0, -8, -10, 0, -5, 0],
    });
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <Animated.View style={[styles.container, { transform: [{ translateY: bouncing }] }]}>
          <View style={{ flex: 0.3 }}>
            <Image
              source={banana}
              style={styles.bananaImage}
            />
          </View>
          <View style={{ flex: 0.7 }}>
            <Image source={dialog} style={styles.imageStyle} />
            <Text style={styles.textStyle}>{speak}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  bananaImage: {
    resizeMode: 'contain',
    width: horizontalScale(100),
    height: horizontalScale(100),
  },
  imageStyle: {
    position: 'absolute',
    resizeMode: 'cover',
    overflow: 'visible',
    width: horizontalScale(230),
    height: horizontalScale(100),
  },
  textStyle: {
    textAlign: 'left',
    alignSelf: 'center',
    padding: 10,
  },
});

export default DetailsButton;
