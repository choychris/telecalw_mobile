import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../components/utilities/backgroundImage';
import StarsImage from '../../components/utilities/starsImage';
import NavBar from '../../components/navBar/container';
import PrizeList from './listContainer';
import Loading from '../utilities/loading/layout';
import { getPrizeList, buyPrizes } from './actions';

const Telebot = require('../../../assets/telebuddies/telebot/telebot_front.png');

class PrizeShop extends Component {
  constructor() {
    super();
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.props.getPrizeList();
  }
  render() {
    const { prizes, buy, navigator } = this.props;
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
        <Image
          source={Telebot}
          style={styles.botStyle}
        />
        <Text style={styles.textStyle}>
          Welcome to Prize Center!
        </Text>
        {
          (prizes.length > 0) ?
            <PrizeList
              prizes={prizes}
              buy={buy}
              navigator={navigator}
            /> : <Loading />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  botStyle: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontFamily: 'PixelOperator8-Bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#D8D8D8',
    fontSize: 20,
  },
});

const mapStateToProps = state => ({
  prizes: state.center.prizes,
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
