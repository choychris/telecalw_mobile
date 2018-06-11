import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import BounceView from '../components/bounceView';
import Content from '../components/leaderBoard/contentContainer';
import Config from '../utils/config';

const { deviceHeight, deviceWidth } = Config;

class LeaderboardView extends Component {
  constructor() {
    super();
    this.bounceAnimate = new Animated.Value(0);
  }
  render() {
    return (
      <BounceView style={styles.container} bounceAnimate={this.bounceAnimate}>
        <Content endGame />
      </BounceView>
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 15,
    justifyContent: 'flex-start',
    ...Config.shadow,
  },
});

export default LeaderboardView;
