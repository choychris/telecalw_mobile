import React, { Component } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BigWin from './bigWin';
import Config, { rewards } from '../../config/constants';
import Strings from '../../config/i18n';

const ticket = require('../../../../assets/utilities/ticket.png');

const { width, boxSize, margin } = Config;
class RewardLine extends Component {
  constructor() {
    super();
    this.animate = new Animated.Value(-margin / 2);
    this.blink = new Animated.Value(0.6);
    this.flipping = new Animated.Value(0);
    this.makeItRain = this.makeItRain.bind(this);
    this.count = 20;
  }

  componentDidMount() {
    if (this.props.gameStarted) {
      this.reposition(0);
    } else {
      this.reposition(-margin / 2);
    }
    this.flip();
  }

  flip() {
    Animated.loop(Animated.timing(
      this.flipping,
      {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      },
    )).start();
  }

  startBlink() {
    Animated.loop(Animated.timing(
      this.blink,
      {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      },
    )).start();
  }

  reposition(x) {
    Animated.timing(
      this.animate,
      {
        delay: 400,
        toValue: x,
        duration: 400,
        useNativeDriver: true,
      },
    ).start();
  }

  makeItRain(second) {
    if (second) this.startBlink();
    const tickets = new Array(this.count);
    return tickets.fill().map((emt, i) =>
      <BigWin
        i={i}
        key={i}
        count={this.count}
        second={second}
      />);
  }

  render() {
    const { win, index, locale } = this.props;
    let opacity = this.blink;
    const mini = (index === 4);
    const images = mini ? new Array(1) : new Array(3);
    if (mini && win > 0) {
      opacity = 0.9;
    }
    const rotateY = this.flipping.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.View
        style={[
          styles.border,
          { opacity, transform: [{ translateX: this.animate }] },
        ]}
      >
        { (win >= rewards.major && !mini) ? this.makeItRain(false) : null }
        { (win >= rewards.major && !mini) ? this.makeItRain(true) : null }
        <Text style={styles.textStyle}>
          { mini ? `${rewards.mini} Tickets!` : `${Strings(locale, 'bigPrize')} ${rewards.major} Tickets!`}
        </Text>
        {
          images.fill().map(() => <Animated.Image
            source={ticket}
            style={[styles.imageStyle, { transform: [{ rotateY }] }]}
            key={Math.random()}
          />)
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    flexDirection: 'row',
    position: 'absolute',
    left: -7,
    bottom: -1,
    height: boxSize + 2,
    width,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: '#FF7B0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: '#FF7B0F',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  imageStyle: {
    height: boxSize,
    width: boxSize,
    resizeMode: 'contain',
    marginHorizontal: 2,
  },
});

const mapStateToProps = state => ({
  win: state.stackerGame.game.win,
  gameStarted: state.stackerGame.home.start,
  locale: state.preference.language.locale,
});

export default connect(mapStateToProps)(RewardLine);
