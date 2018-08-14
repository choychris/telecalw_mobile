import React, { Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Easing,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import StarImages from '../../../components/utilities/starsImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import Referral from './referral';
import Redeem from './redeem';
import { playUISound } from '../../../utils/sound';
import { confirmRedeem } from '../actions';
import { trackScreen } from '../../../utils/analytic';
import AdsBanner from '../../../components/AdsBanner';
import RewardedVideoContainer from './missionAds/layout';

const { height, width } = Dimensions.get('window');

class Reward extends Component {
  constructor(props) {
    super(props);
    this._floating = new Animated.ValueXY({
      x: width * 0.7,
      y: -height * 0.12,
    });
    this._animation = new Animated.Value(0);
  }
  componentWillMount() {
    const { trackScreen } = this.props;
    trackScreen('Reward');
  }
  componentDidMount() {
    const { playUISound } = this.props;
    this._floatingAnimation();
    setTimeout(() => {
      playUISound('talking');
      this._fadeAnimation();
    }, 500);
  }
  shouldComponenetUpdate() {
    return false;
  }
  _fadeAnimation() {
    Animated.timing(this._animation, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
    }).start();
  }
  _floatingAnimation() {
    Animated.loop(Animated.sequence([
      Animated.timing(this._floating, {
        duration: 1000,
        toValue: {
          x: width * 0.7,
          y: -height * 0.12 + 5,
        },
        easing: Easing.linear,
      }),
      Animated.timing(this._floating, {
        duration: 1000,
        toValue: {
          x: width * 0.7,
          y: -height * 0.12,
        },
        easing: Easing.linear,
      }),
    ])).start();
  }
  _opacityAnimation() {
    return {
      opacity: this._animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }
  _renderContainer() {
    return (
      <View style={styles.innerContainer}>
        <ScrollView >
          <Referral />
          <Redeem />
        </ScrollView>
      </View>
    );
  }
  render() {
    const { navigator, confirmRedeem, version } = this.props;
    const { release } = version;
    const tabs = [
      {
        name: 'referral',
        content: this._renderContainer(),
        buttons: (version.release === true) ? [
          {
            text: 'confirm',
            textStyle: {
              color: 'white',
              fontSize: 20,
              fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
            },
            btnStyle: {
              backgroundColor: '#4C4C4C',
              paddingVertical: 8,
              paddingHorizontal: 10,
            },
            onPressFunction: () => confirmRedeem(navigator),
          },
        ] : null,
      },
      {
        name: 'mission',
        content: <RewardedVideoContainer navigator={navigator} />,
      },
    ];
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage type="random" />
        <StarImages />
        <NavBar
          back
          coins
          navigator={navigator}
        />
        <KeyboardAvoidingView
          behavior="position"
          style={styles.keyboardView}
        >
          <Animated.View
            style={[this._opacityAnimation()]}
          >
            <MessageBox
              type="right"
              tabs={tabs}
              promptString={(version.release === true) ? 'rewardPrompt' : 'sharePrompt'}
            />
          </Animated.View>
          <Animated.View
            style={[this._floating.getLayout()]}
          >
            <Telebot
              status="normal"
              height={height * 0.1}
              width={height * 0.1}
            />
          </Animated.View>
        </KeyboardAvoidingView>
        <AdsBanner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#263E50',
  },
  innerContainer: {
    alignSelf: 'stretch',
    flex: 5,
  },
  keyboardView: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    version: state.mis.version,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmRedeem,
    playUISound,
    trackScreen,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reward);
