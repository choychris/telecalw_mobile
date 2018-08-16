import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  StatusBar,
  // Image,
  Text,
  Alert,
  Easing,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import emoji from 'node-emoji';
import BackgroundImage from '../../components/utilities/backgroundImage';
import StarsImage from '../../components/utilities/starsImage';
import NavBar from '../../components/navBar/container';
import PrizeList from './listContainer';
import PrizeDetails from './details';
import Loading from '../utilities/loading/layout';
import { getPrizeList, buyPrizes } from './actions';
import Strings from '../miscellaneous/i18n';

const Telebot = require('../../../assets/telebuddies/telebot/telebot_love.png');

class PrizeShop extends Component {
  constructor() {
    super();
    this.state = {
      details: null,
    };
    this.swing = new Animated.Value(0);
    this.reveal = new Animated.Value(0);
    this.slideIn = new Animated.Value(0);
    this.exchange = this.exchange.bind(this);
    this.swingStart = this.swingStart.bind(this);
    this.revealList = this.revealList.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
  }
  componentDidMount() {
    this.props.getPrizeList();
    this.swingStart();
    this.revealList();
  }
  swingStart() {
    const move = Animated.timing(
      this.swing,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    );
    Animated.loop(move).start();
  }
  revealList() {
    Animated.timing(
      this.reveal,
      {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      },
    ).start();
  }
  exchange(id, productName, ticketPrice) {
    const { navigator, buy, locale } = this.props;
    Alert.alert(
      `${Strings(locale, 'acquire')} ${emoji.get('bear')}`,
      `Want to use ${ticketPrice} tickets to get 1 "${productName}" ${emoji.get('question')}`,
      [
        {
          text: `${Strings(locale, 'no')} ${emoji.get('heavy_multiplication_x')}`,
          style: 'cancel',
        },
        {
          text: `${Strings(locale, 'yes')} ${emoji.get('heavy_check_mark')}`,
          onPress: () => {
            buy(navigator, id, ticketPrice, productName);
          },
        },
      ],
    );
  }
  showDetails(i) {
    const { prizes } = this.props;
    this.setState({ details: prizes[i] });
    Animated.timing(
      this.slideIn,
      {
        toValue: -500,
        duration: 600,
        useNativeDriver: true,
      },
    ).start();
  }
  closeDetails() {
    Animated.timing(
      this.slideIn,
      {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      },
    ).start(() => {
      this.setState({ details: null });
    });
  }
  render() {
    const { prizes, navigator, locale } = this.props;
    const { details } = this.state;
    const rotate = this.swing.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: ['0deg', '-10deg', '10deg', '0deg'],
    });
    const detailSlide = this.slideIn.interpolate({
      inputRange: [-500, 0],
      outputRange: [0, 500],
    });
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage type="random" />
        <StarsImage />
        <NavBar
          back
          coins
          navigator={navigator}
        />
        <Animated.Image
          source={Telebot}
          style={[styles.botStyle, { transform: [{ rotate }] }]}
        />
        <Text style={styles.textStyle}>
          Welcome to Prize Center!
        </Text>
        {
          (prizes.length > 0) ?
            <PrizeList
              prizes={prizes}
              buy={this.exchange}
              locale={locale}
              showDetails={this.showDetails}
              translateX={this.slideIn}
            /> : <Loading />
        }
        { details ?
          <PrizeDetails
            closeDetails={this.closeDetails}
            {...details}
            buy={this.exchange}
            locale={locale}
            translateX={detailSlide}
          /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  botStyle: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    margin: 8,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontFamily: 'PixelOperator8-Bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    zIndex: 1,
  },
});

const mapStateToProps = state => ({
  prizes: state.center.prizes,
  locale: state.preference.language.locale,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPrizeList,
      buy: buyPrizes,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrizeShop);
