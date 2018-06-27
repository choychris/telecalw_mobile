import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, StyleSheet, Animated } from 'react-native';
import Config from '../../utils/config';

const details1 = require('../../images/details1.png');
const details2 = require('../../images/details2.png');
const details3 = require('../../images/details3.png');
const details4 = require('../../images/details4.png');

const { deviceWidth, deviceHeight } = Config;

const detailSlide = [
  details1,
  details2,
  details3,
  details4,
];

class DetailSwiper extends Component {
  constructor() {
    super();
    this.animateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const translateX = this.animateValue.interpolate({
      inputRange: [0, 0.2, 0.4, 0.43, 0.53, 0.7, 0.8, 0.9, 1],
      outputRange: [400, 0, -30, -30, 0, -15, 0, -4, 0],
    });
    return (
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <Icon
          name="times"
          size={20}
          color="white"
          style={styles.iconStyle}
          onPress={this.props.onPress}
        />
        <Swiper style={styles.wrapper} loop={false}>
          { detailSlide.map(slide =>
            <Image
              key={Math.random()}
              source={slide}
              style={styles.imageStyle}
            />) }
        </Swiper>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: (deviceHeight / 12),
    left: deviceWidth / 16,
    height: (deviceHeight / 1.2),
    width: deviceWidth * (7 / 8),
    backgroundColor: '#81C3D7',
    borderRadius: 10,
    padding: 10,
  },
  wrapper: {
    paddingBottom: 10,
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'contain',
    height: (deviceHeight / 1.2) - 20,
    width: (deviceWidth * (7 / 8)) - 20,
  },
});

export default DetailSwiper;
