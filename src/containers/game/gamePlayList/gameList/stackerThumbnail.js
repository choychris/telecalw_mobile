import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing,
} from 'react-native';

const buddies = require('../../../../stacker_game/images/buddies.png');

class StackerThumbnail extends Component {
  constructor() {
    super();
    this.animateValue = new Animated.Value(0);
    this.startAnimation = this.startAnimation.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    // this.animateValue.setValue(0);
    Animated.loop(Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 3000,
        delay: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    )).start();
  }

  render() {
    const translateX = this.animateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 26, 0],
    });
    return (
      <TouchableOpacity
        disabled
        style={styles.container}
        onPress={this.props.toGame}
      >
        <Text style={styles.textStyle}>
          Stack Buddies
        </Text>
        <View>
          <Animated.Image
            source={buddies}
            style={[
              styles.imageStyle,
              { transform: [{ translateX }] },
            ]}
          />
          <Animated.Image
            source={buddies}
            style={[
              styles.imageStyle,
              { alignSelf: 'center' },
            ]}
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
    opacity: 0.3,
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontSize: 22,
    fontFamily: 'PixelOperatorSC-Bold',
    color: 'white',
    textAlign: 'center',
  },
  imageStyle: {
    width: 90,
    height: 35,
    resizeMode: 'contain',
  },
});

export default StackerThumbnail;
