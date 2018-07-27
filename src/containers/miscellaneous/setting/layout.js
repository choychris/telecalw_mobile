import React, { Component } from 'react';
import {
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
import StarsImage from '../../../components/utilities/starsImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import { playUISound } from '../../../utils/sound';
import { getUserInfo, logout } from '../../auth/actions';
import SettingForm from './form';
// import { trackScreen } from '../../../utils/analytic';

const { height, width } = Dimensions.get('window');

class Setting extends Component {
  constructor(props) {
    super(props);
    this.floating = new Animated.ValueXY({
      x: width * 0.35,
      y: -height * 0.1,
    });
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // const { getUserInfo, playUISound } = this.props;
    this.props.getUserInfo();
    this.floatingAnimation();
    this.props.playUISound('talking');
    setTimeout(() => this.fadeAnimation(), 500);
  }
  shouldComponentUpdate() {
    return false;
  }
  fadeAnimation() {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
    }).start();
  }
  floatingAnimation() {
    Animated.loop(Animated.sequence([
      Animated.timing(this.floating, {
        duration: 1000,
        toValue: {
          x: width * 0.35,
          y: (-height * 0.1) + 5,
        },
        easing: Easing.linear,
      }),
      Animated.timing(this.floating, {
        duration: 1000,
        toValue: {
          x: width * 0.35,
          y: -height * 0.1,
        },
        easing: Easing.linear,
      }),
    ])).start();
  }
  opacityAnimation() {
    return {
      opacity: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }
  render() {
    const { navigator, logout } = this.props;
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
        <Animated.View style={[this.opacityAnimation()]}>
          <MessageBox
            title="setting"
            type="right"
            content={<SettingForm navigator={navigator} />}
            promptString="settingPrompt"
            buttons={[
              {
                text: 'logout',
                textStyle: {
                  color: 'white',
                  fontSize: 20,
                  fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
                },
                btnStyle: {
                  backgroundColor: '#E63946',
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                },
                borderColor: '#8E2633',
                onPressFunction: () => logout(null, navigator),
              },
            ]}
          />
        </Animated.View>
        <Animated.View
          style={[this.floating.getLayout()]}
        >
          <Telebot
            status="setting"
            height={height * 0.13}
            width={height * 0.13}
          />
        </Animated.View>
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
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserInfo,
    logout,
    playUISound,
    // trackScreen,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Setting);
