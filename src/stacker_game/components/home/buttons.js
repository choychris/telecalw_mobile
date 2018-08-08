import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import emoji from 'node-emoji';
import NavBtn from './navButton';

const coin = require('../../../../assets/utilities/coins/telecoins_single.png');
const coins = require('../../../../assets/utilities/coins/telecoins_multi.png');

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
      start, navigator, winner, how,
    } = this.props;
    return (
      <View style={styles.constainer}>
        <NavBtn color="#E0CF18" text={'15\nPlay'} pic={coin} onPress={start} />
        <NavBtn
          color="#50E3C2"
          text={'Buy\nCoins'}
          pic={coins}
          onPress={() => { toTopUp(navigator); }}
        />
        <NavBtn
          color="orange"
          text={`${emoji.get('medal')}\nWeekly\nWinners`}
          onPress={winner}
        />
        <NavBtn color="orange" text={`${emoji.get('question')}\nHow to\nPlay`} onPress={how} />
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

export default HomeButtons;
