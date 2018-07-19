import React, { Component } from 'react';
import { Animated, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BigWin from './bigWin';
import Config from '../../config/constants';

const ticket = require('../../../../assets/utilities/ticket.png');

const { width, boxSize, margin } = Config;
class RewardLine extends Component {
  constructor() {
    super();
    this.animate = new Animated.Value(-margin / 2);
  }

  componentDidMount() {
    if (this.props.gameStarted) {
      this.reposition(0);
    } else {
      this.reposition(-margin / 2);
    }
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

  render() {
    const { win, index } = this.props;
    let opacity = 0.5;
    const minor = (index === 4);
    const images = minor ? new Array(1) : new Array(3);
    if (minor) {
      if (win > 0) opacity = 0.8;
    } else if (win >= 1000) {
      opacity = 0.8;
    }
    return (
      <Animated.View
        style={[
          styles.border,
          { opacity, transform: [{ translateX: this.animate }] },
        ]}
      >
        <BigWin />
        <Text style={styles.textStyle}>
          { minor ? '100 Tickets!' : 'Big Prize! 1000 Tickets!'}
        </Text>
        {
          images.fill().map(() => <Image
            source={ticket}
            style={styles.imageStyle}
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
});

export default connect(mapStateToProps)(RewardLine);
