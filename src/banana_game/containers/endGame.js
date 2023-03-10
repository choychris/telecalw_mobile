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
      playAgain, wallet,
      canRetry, score,
      sendingScore, saveError, lang,
    } = this.props;
    const enoughMoney = wallet >= 8;
    const enoughForBonus = wallet >= 20;
    return (
      <BounceView style={styles.container} bounceAnimate={this.bounceAnimate}>
        <EncourageWord />
        <View style={[styles.warpperStyle, { flex: 0.7 }]}>
          <Text style={styles.textStyle}>{'Time\'s up'}</Text>
        </View>
        {(enoughMoney && canRetry && !sendingScore) ?
          <ContinueSign
            canRetry={canRetry}
            playAgain={playAgain}
            lang={lang}
          /> :
          <SaveScore
            score={score}
            showBoard={this.goUp}
            saveError={saveError}
            lang={lang}
            enoughForBonus={enoughForBonus}
          />
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
    fontSize: 32,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'PixelOperator8-Bold',
  },
});

const mapStateToProps = state => ({
  sendingScore: state.bananaGame.afterGame.sendingScore,
  saveError: state.bananaGame.afterGame.saveError,
  wallet: state.auth.wallet.balance,
  lang: state.preference.language.locale,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    reset: AfterGameAction.reset,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EndGamePopUp);
