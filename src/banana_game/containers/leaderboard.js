import React, { Component } from 'react';
import { StyleSheet, Animated, View, Image } from 'react-native';
import BounceView from '../components/bounceView';
import Content from '../components/leaderBoard/contentContainer';
import Config, { shadow } from '../utils/config';

const titleImage = require('../images/titleImage.png');

const { deviceHeight, deviceWidth } = Config;

class LeaderboardView extends Component {
  constructor() {
    super();
    this.bounceAnimate = new Animated.Value(0);
    this.animateValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      },
    ).start();
  }

  renderBouncing(endGame) {
    const bottom = endGame ?
      (deviceHeight / 12) : (deviceHeight / 30);
    return (
      <BounceView
        style={[styles.container, { bottom }]}
        bounceAnimate={this.bounceAnimate}
      >
        <Content endGame={endGame} />
      </BounceView>
    );
  }

  render() {
    const { endGame } = this.props;
    if (endGame) {
      return this.renderBouncing(endGame);
    }
    return (
      <Animated.View style={[styles.fadeContent, { opacity: this.animateValue }]}>
        <View style={{ height: 20 }} />
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={titleImage} />
        </View>
        { this.renderBouncing(endGame) }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: deviceWidth / 16,
    height: (deviceHeight / 1.2),
    width: deviceWidth * (7 / 8),
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 15,
    justifyContent: 'flex-start',
    ...shadow,
  },
  fadeContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.3,
  },
  imageStyle: {
    alignSelf: 'flex-start',
    width: deviceWidth,
    height: 50,
    resizeMode: 'contain',
  },
});

export default LeaderboardView;
