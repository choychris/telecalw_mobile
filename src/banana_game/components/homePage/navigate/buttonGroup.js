import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayButton from './playButton';
import NavigateButton from './navigateButton';
import { navigateGame } from '../../../actions/startGameAction';
import { playUISound } from '../../../../utils/sound';
import locale from '../../../utils/i18n/language';

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
  requiredCoin, start, navigator,
  openLb, sound, release, lang,
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
        { release ?
          <NavigateButton
            image={coins}
            text={locale(lang, 'buyCoins')}
            onPress={() => toTopUp(navigator)}
          /> : null }
        <NavigateButton
          image={leaderboard}
          text={locale(lang, 'lb')}
          onPress={openLb}
        />
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
    release: state.mis.version.release,
    lang: state.preference.language.locale,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    start: navigateGame,
    sound: playUISound,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
