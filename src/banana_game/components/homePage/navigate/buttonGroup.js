import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayButton from './playButton';
import NavigateButton from './navigateButton';
import { navigateGame } from '../../../actions/startGameAction';
import { playUISound } from '../../../../utils/sound';

// const coins = require('../../../images/telecoins_multi.png');
const coins = require('../../../../../assets/utilities/coins/telecoins_single.png');

const leaderboard = require('../../../images/leaderboard.png');

const toTopUp = (navigator) => {
  navigator.push({
    screen: 'app.TopUp',
    navigatorStyle: {
      navBarHidden: true,
    },
    animationType: 'fade',
  });
};

const ButtonGroup = ({
  requiredCoin, start, navigator, openLb, sound,
}) =>
  (
    <View style={styles.container}>
      <View style={{ flex: 0.7, justifyContent: 'center' }}>
        <PlayButton
          requiredCoin={requiredCoin}
          text="START"
          onPress={() => {
            start(true, navigator);
            sound('start');
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', padding: 5 }}>
        <NavigateButton image={coins} text={'Buy\nCoins'} onPress={() => toTopUp(navigator)} />
        <NavigateButton image={leaderboard} text={'Leader\nboard'} onPress={openLb} />
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
    requiredCoin: state.bananaGame.startGame.coins,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    start: navigateGame,
    sound: playUISound,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
