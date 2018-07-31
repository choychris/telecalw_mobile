import React, { Component } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { payment, selectRate } from '../../actions';
import { playUISound } from '../../../../utils/sound';
import Telebot from '../../../../components/telebuddies/telebot';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import StarsImage from '../../../../components/utilities/starsImage';
import NavBar from '../../../../components/navBar/container';
import MessageBox from '../../../../components/messageBox/container';
import RateListContainer from './listContainer';
import TransactionListContainer from '../record/listContainer';
import { trackScreen } from '../../../../utils/analytic';
import AdsBanner from '../../../../components/AdsBanner';

const { height } = Dimensions.get('window');

class TopUp extends Component {
  constructor(props) {
    super(props);
    const { navigator } = props;
    this.swing = new Animated.Value(0);
    this.animation = new Animated.Value(0);
    this.state = {
      tabs: [
        {
          name: 'transactions',
          content: <TransactionListContainer navigator={navigator} />,
        },
      ],
    };
  }
  componentWillMount() {
    // const { trackScreen } = this.props;
    // trackScreen('TopUp');
  }
  componentDidMount() {
    const { playUISound } = this.props;
    setTimeout(() => {
      this.sound = playUISound('coins');
      this.fadeAnimation();
    }, 2000);
    this.swingAnimation();
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    // Reset Rate Selection
    this.props.selectRate(null);
  }
  fadeAnimation() {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }
  swingAnimation() {
    this.swing.setValue(0);
    Animated.timing(this.swing, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => this.swingAnimation());
  }
  render() {
    const {
      navigator,
      version,
      payment,
    } = this.props;
    const { tabs } = this.state;
    const swing = this.swing.interpolate({
      inputRange: [0, 0.25, 0.5, 0.9, 1],
      outputRange: ['0deg', '15deg', '0deg', '-5deg', '0deg'],
    });
    if (version.release === true) {
      tabs.unshift({
        name: 'coins',
        content: <RateListContainer navigator={navigator} />,
        buttons: [
          {
            text: 'confirmText',
            textStyle: {
              color: 'white',
              fontSize: 20,
              fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
            },
            btnStyle: {
              backgroundColor: '#00A676',
              paddingVertical: 8,
              paddingHorizontal: 10,
            },
            onPressFunction: () => payment(navigator),
          },
        ],
      });
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage type="random" />
        <StarsImage />
        <NavBar
          back
          coins
          coinsDisable
          navigator={navigator}
        />
        <KeyboardAvoidingView
          behavior="position"
          style={styles.keyboardView}
        >
          <Animated.View style={{ opacity: this.animation }}>
            <MessageBox
              type="left"
              tabs={tabs}
              promptString={(version.release === true) ? 'topUpPrompt' : 'recordPrompt'}
            />
          </Animated.View>
          <Animated.View
            style={[{ bottom: height * 0.12, left: 0 }, { transform: [{ rotate: swing }] }]}
          >
            <Telebot
              status="money"
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
    payment,
    selectRate,
    playUISound,
    trackScreen,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
