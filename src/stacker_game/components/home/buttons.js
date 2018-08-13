import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import emoji from 'node-emoji';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBtn from './navButton';
import { playUISound } from '../../../utils/sound';
import LoginButton from '../../../components/utilities/loginButton';
import { coins } from '../../config/constants';
import Strings from '../../config/i18n';

const coin = require('../../../../assets/utilities/coins/telecoins_single.png');
const coinsMulti = require('../../../../assets/utilities/coins/telecoins_multi.png');

const toTopUp = (navigator) => {
  navigator.push({
    screen: 'app.TopUp',
    navigatorStyle: {
      navBarHidden: true,
    },
    animationType: 'fade',
  });
};

class HomeButtons extends Component {
  constructor() {
    super();
    this.drop = new Animated.Value(0);
  }

  render() {
    const {
      start, navigator, winner, how, locale, loggedIn, playSound,
    } = this.props;
    if (!loggedIn) {
      return <LoginButton navigator={navigator} />;
    }
    return (
      <View style={styles.constainer}>
        <NavBtn
          color="#E0CF18"
          text={`${coins}\n${Strings(locale, 'play')}`}
          pic={coin}
          onPress={() => {
            playSound('start');
            start();
          }}
        />
        <NavBtn
          color="#4A90E2"
          text={Strings(locale, 'buyCoin')}
          pic={coinsMulti}
          onPress={() => { toTopUp(navigator); }}
        />
        <NavBtn
          color="#4A90E2"
          text={`${emoji.get('medal')}\n${Strings(locale, 'weeklyWin')}`}
          onPress={() => {
            playSound('spaceship');
            winner();
          }}
        />
        <NavBtn
          color="#4A90E2"
          text={`${emoji.get('question')}\n${Strings(locale, 'how')}`}
          onPress={() => {
            playSound('spaceship');
            how();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginTop: 20,
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    playSound: playUISound,
  }, dispatch);

export default connect(null, mapDispatchToProps)(HomeButtons);
