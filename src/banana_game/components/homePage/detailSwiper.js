import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, StyleSheet, Animated, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playCount } from '../../actions/leaderboardAction';
import { changeLocale } from '../../utils/i18n/language';
import CurrentReward from './currentReward';
import Config from '../../utils/config';

const en1 = require('../../images/en_details1.png');
const en2 = require('../../images/en_details2.png');
const en3 = require('../../images/en_details3.png');
const en4 = require('../../images/en_details4.png');
const zh1 = require('../../images/zh_details1.png');
const zh2 = require('../../images/zh_details2.png');
const zh3 = require('../../images/zh_details3.png');
const zh4 = require('../../images/zh_details4.png');

const { deviceWidth, deviceHeight } = Config;
const posters = {
  en: [0, en1, en2, en3, en4],
  zhHant: [0, zh1, zh2, zh3, zh4],
};

class DetailSwiper extends Component {
  constructor() {
    super();
    this.animateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.playCount();
    this.animate();
  }

  animate() {
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const { lang, playerCount } = this.props;
    const translateX = this.animateValue.interpolate({
      inputRange: [0, 0.2, 0.4, 0.43, 0.53, 0.7, 0.8, 0.9, 1],
      outputRange: [400, 0, -30, -30, 0, -15, 0, -4, 0],
    });
    const detailSlide = changeLocale[lang] ? posters[changeLocale[lang]] : posters.en;
    return (
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <Icon
          name="times"
          size={20}
          color="white"
          style={styles.iconStyle}
          onPress={this.props.onPress}
        />
        <Swiper style={styles.wrapper} loop={false}>
          { detailSlide.map((slide) => {
            if (slide === 0) {
              return (
                <CurrentReward
                  key={Math.random()}
                  playerCount={playerCount}
                  containerStyle={styles.reward}
                />
              );
            }
            return (
              <Image
                key={Math.random()}
                source={slide}
                style={styles.imageStyle}
              />
            );
          })}
        </Swiper>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: (deviceHeight / 12),
    left: deviceWidth / 16,
    height: (deviceHeight / 1.2),
    width: deviceWidth * (7 / 8),
    backgroundColor: '#81C3D7',
    borderRadius: 10,
    padding: 10,
    elevation: (Platform.OS === 'ios') ? null : 3,
  },
  wrapper: {
    paddingBottom: 10,
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'contain',
    height: (deviceHeight / 1.2) - 20,
    width: (deviceWidth * (7 / 8)) - 20,
  },
  reward: {
    height: (deviceHeight / 1.2) - 20,
    width: (deviceWidth * (7 / 8)) - 20,
  },
});

const mapStateToProps = state => ({
  playerCount: state.bananaGame.leaderboard.totalPlayer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    playCount,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailSwiper);
