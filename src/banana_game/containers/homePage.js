import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DetailsButton from '../components/homePage/detailsButton';
import NavButtonGroup from '../components/homePage/navigate/buttonGroup';
import ItemButtonGroup from '../components/homePage/items/itemButtonGroup';
import DetailSwiper from '../components/homePage/detailSwiper';
import LoginButton from '../../components/utilities/loginButton';
import BackButton from '../../components/navBar/container';
import Config from '../utils/config';
import { chooseGame } from '../../containers/game/actions';
import { viewLeaderBoard } from '../actions/leaderboardAction';
import { resetLevel } from '../actions/gameActions';
import { playUISound } from '../../utils/sound';
import locale from '../utils/i18n/language';

const titleImage = require('../images/titleImage.png');

const { deviceWidth } = Config;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOpened: false,
    };
    props.saveGameId('A0001');
    this.animateValue = new Animated.Value(0);
    this.onDetailsPress = this.onDetailsPress.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);
    this.openLeaderboard = this.openLeaderboard.bind(this);
  }

  componentDidMount() {
    this.props.resetLevel();
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      },
    ).start();
  }

  onDetailsPress() {
    this.props.playUISound('whoosh');
    this.setState({ detailOpened: true });
  }

  onDetailClose() {
    this.setState({ detailOpened: false });
  }

  openLeaderboard() {
    this.props.openLb(true);
    this.props.playUISound('whoosh');
  }

  render() {
    const { detailOpened } = this.state;
    const { navigator, token, lang } = this.props;
    const loggedIn = !!token;
    return (
      <Animated.View style={[styles.container, { opacity: this.animateValue }]}>
        <StatusBar hidden />
        <BackButton back coins navigator={navigator} />
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={titleImage} />
        </View>
        <DetailsButton
          onPress={this.onDetailsPress}
          speak={locale(lang, 'speak')}
        />
        { loggedIn ?
          <NavButtonGroup
            openLb={this.openLeaderboard}
            navigator={navigator}
          /> : null }
        { loggedIn ? <ItemButtonGroup /> : <LoginButton navigator={navigator} /> }
        { detailOpened ?
          <DetailSwiper onPress={this.onDetailClose} lang={lang} /> : null }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.3,
  },
  imageStyle: {
    alignSelf: 'flex-start',
    width: deviceWidth,
    height: 50,
    resizeMode: 'contain',
  },
});

const mapStateToProps = state =>
  ({
    lang: state.preference.language.locale,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    saveGameId: chooseGame,
    openLb: viewLeaderBoard,
    playUISound,
    resetLevel,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
