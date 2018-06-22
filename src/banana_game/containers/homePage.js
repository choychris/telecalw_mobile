import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DetailsButton from '../components/homePage/detailsButton';
import NavButtonGroup from '../components/homePage/navigate/buttonGroup';
import ItemButtonGroup from '../components/homePage/items/itemButtonGroup';
import DetialSwiper from '../components/homePage/detailSwiper';
import BackButton from '../../components/navBar/container';
import Config from '../utils/config';
import { chooseGame } from '../../containers/game/actions';
import { viewLeaderBoard } from '../actions/leaderboardAction';
import { playUISound } from '../../utils/sound';

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
    const { navigator } = this.props;
    return (
      <Animated.View style={[styles.container, { opacity: this.animateValue }]}>
        <StatusBar hidden />
        <BackButton back coins navigator={navigator} />
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={titleImage} />
        </View>
        <DetailsButton onPress={this.onDetailsPress} />
        <NavButtonGroup
          openLb={this.openLeaderboard}
          navigator={navigator}
        />
        <ItemButtonGroup />
        { detailOpened ?
          <DetialSwiper onPress={this.onDetailClose} /> : null }
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    saveGameId: chooseGame,
    openLb: viewLeaderBoard,
    playUISound,
  }, dispatch);

export default connect(null, mapDispatchToProps)(HomePage);
