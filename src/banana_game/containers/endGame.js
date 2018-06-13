import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EncourageWord from '../components/afterGame/encourage';
import ContinueSign from '../components/afterGame/continue';
import SaveScore from '../components/afterGame/saveScore';
import AfterGameAction from '../actions/afterGameActions';
import BounceView from '../components/bounceView';

import Config from '../utils/config';

const { deviceHeight, deviceWidth } = Config;

class EndGamePopUp extends Component {
  constructor(props) {
    super(props);
    this.bounceAnimate = new Animated.Value(0);
    this.goUp = this.goUp.bind(this);
    props.reset();
  }

  goUp() {
    this.bounceAnimate.setValue(0.2);
    Animated.timing(
      this.bounceAnimate,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      },
    ).start(this.props.showBoard);
  }

  render() {
    const {
      playAgain, canRetry, score, sendingScore,
    } = this.props;
    return (
      <BounceView style={styles.container} bounceAnimate={this.bounceAnimate}>
        <EncourageWord />
        <View style={[styles.warpperStyle, { flex: 0.7 }]}>
          <Text style={styles.textStyle}>{'Time\'s up'}</Text>
        </View>
        {(canRetry && !sendingScore) ?
          <ContinueSign canRetry={canRetry} playAgain={playAgain} /> :
          <SaveScore score={score} showBoard={this.goUp} />
        }
      </BounceView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: (deviceHeight / 4) - 50,
    left: deviceWidth / 10,
    height: (deviceHeight / 2) + 70,
    width: deviceWidth * (4 / 5),
    // backgroundColor: 'rgba(6,120,194,0.6)',
    backgroundColor: 'rgba(255,255,255,0.6)',
    // borderWidth: 5,
    // borderColor: '#05485E',
    borderRadius: 15,
    justifyContent: 'flex-start',
    ...Config.shadow,
  },
  warpperStyle: {
    flex: 0.7,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 40,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
});

const mapStateToProps = state => ({
  sendingScore: state.bananaGame.afterGame.sendingScore,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    reset: AfterGameAction.reset,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EndGamePopUp);
