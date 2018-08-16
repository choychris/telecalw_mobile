import React, { Component } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Config, { rewards } from '../../config/constants';
import Strings from '../../config/i18n';

const ticket = require('../../../../assets/utilities/ticket.png');

const { playWidth, boxSize } = Config;
class RewardLine extends Component {
  constructor() {
    super();
    this.blink = new Animated.Value(0.6);
    this.flipping = new Animated.Value(0);
    this.startBlink = this.startBlink.bind(this);
    this.count = 20;
  }

  componentDidMount() {
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
        // useNativeDriver: true,
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

  // makeItRain(second) {
  //   if (second) this.startBlink();
  //   const tickets = new Array(this.count);
  //   return tickets.fill().map((emt, i) =>
  //     <BigWin
  //       i={i}
  //       key={i}
  //       count={this.count}
  //       second={second}
  //     />);
  // }

  render() {
    const { win, index, locale } = this.props;
    let opacity = this.blink;
    const mini = (index === 4);
    const images = mini ? new Array(1) : new Array(3);
    if (mini && win > 0) {
      opacity = 0.9;
    }
    if (win >= rewards.major) {
      opacity = this.blink;
      this.startBlink();
    }
    const rotateY = this.flipping.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.View
        style={[
          styles.border,
          { opacity },
        ]}
      >
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
    height: boxSize + 2,
    width: playWidth - 6,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 0,
    borderRightWidth: 0,
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
  locale: state.preference.language.locale,
});

export default connect(mapStateToProps)(RewardLine);
