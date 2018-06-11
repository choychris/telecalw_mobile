import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayButton from './playButton';
import NavigateButton from './navigateButton';
import { startGame } from '../../../actions/startGameAction';

const coins = require('../../../images/telecoins_multi.png');
const leaderboard = require('../../../images/leaderboard.png');

const ButtonGroup = ({ requiredCoin, start }) =>
  (
    <View style={styles.container}>
      <View style={{ flex: 0.7, justifyContent: 'center' }}>
        <PlayButton requiredCoin={requiredCoin} text="START" onPress={start} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', padding: 5 }}>
        <NavigateButton image={coins} text={'Buy\nCoins'} />
        <NavigateButton image={leaderboard} text={'Leader-\nboard'} />
      </View>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
  },
});

const mapStateToProps = state =>
  ({
    requiredCoin: state.startGame.coins,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    start: startGame,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
