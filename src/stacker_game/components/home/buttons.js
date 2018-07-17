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


class HomeButtons extends Component {
  constructor() {
    super();
    this.drop = new Animated.Value(0);
  }

  render() {
    const { start } = this.props;
    return (
      <View style={styles.constainer}>
        <NavBtn color="#E0CF18" text={'15\nPlay'} pic={coin} onPress={start} />
        <NavBtn color="#50E3C2" text={'Buy\nCoins'} pic={coins} />
        <NavBtn color="orange" text={`${emoji.get('moneybag')}\nToday's\nWinners!`} />
        <NavBtn color="orange" text={'How\nto\nPlay'} />
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
