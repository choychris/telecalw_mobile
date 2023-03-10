import React, { Component } from 'react';
import {
  Easing, Animated, View, StatusBar, Alert,
  StyleSheet, Dimensions, KeyboardAvoidingView, Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import StarsImage from '../../../components/utilities/starsImage';
import Telebot from '../../../components/telebuddies/telebot';
import MessageBox from '../../../components/messageBox/container';
import NavBar from '../../../components/navBar/container';
import GamePlaySelect from './play/listContainer';
import LogisticForm from './logistic/layout';
import { playUISound } from '../../../utils/sound';
import { getUserInfo } from '../../auth/actions';
import {
  getLogisticQuote, resetLogistic,
  confirmDelivery, confirmPlaySelect, showTracking,
  getDeliveryData,
} from '../actions';
import QuoteSelect from './quote/listContainer';
import Receipt from './receipt/layout';
// import { trackScreen } from '../../../utils/analytic';

const emoji = require('node-emoji');

const { width, height } = Dimensions.get('window');

class Delivery extends Component {
  constructor(props) {
    super(props);
    // Possible State of Display :
    // 1. gamePlaySelect
    // 2  logisticForm
    // 3. quoteSelect
    // 4. deliveryReceipt
    this.state = {
      display: 'gamePlaySelect',
      alertShown: false,
    };
    this._position = new Animated.ValueXY({
      x: 0,
      y: height * 0.1,
    });
    this._animation = new Animated.Value(0);
    this._renderShip = this._renderShip.bind(this);
  }
  // componentWillMount() {
  //   const { trackScreen } = this.props;
  //   trackScreen('Delivery');
  // }
  componentDidMount() {
    const { getUserInfo, playUISound } = this.props;
    getUserInfo();
    setTimeout(() => {
      playUISound('whoosh');
      this._slideUpAnimation();
    }, 1000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { display } = this.state;
    return display !== nextState.display;
  }
  componentWillUnmount() {
    // Clear Selected Play / Reset
    const { resetLogistic } = this.props;
    resetLogistic();
  }
  _fadeAnimation() {
    Animated.timing(this._animation, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
    }).start();
  }
  _slideUpAnimation() {
    Animated.sequence([
      Animated.spring(this._position, {
        bounciness: 15,
        toValue: {
          x: 0,
          y: -height * 0.1,
        },
      }),
    ]).start(() => this._fadeAnimation());
  }
  _opacityAnimation() {
    return {
      opacity: this._animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }
  _renderContent(display) {
    const { navigator } = this.props;
    switch (display) {
      case 'gamePlaySelect':
        return <GamePlaySelect
          navigator={navigator}
          didMount={() => { this.setState({ display: 'gamePlaySelect' }); }}
        />;
      case 'logisticForm':
        return <LogisticForm />;
      case 'quoteSelect':
        return <QuoteSelect />;
      default:
        return <GamePlaySelect
          navigator={navigator}
          didMount={() => { this.setState({ display: 'gamePlaySelect' }); }}
        />;
    }
  }
  _renderShip(display) {
    const { navigator, getDeliveryData } = this.props;
    switch (display) {
      case 'gamePlaySelect':
        return <GamePlaySelect
          nextState={(id) => {
            if (id) getDeliveryData(navigator, id);
            this.setState({ display: 'deliveryReceipt' });
           }}
          navigator={navigator}
          didMount={() => { this.setState({ display: 'gamePlaySelect' }); }}
        />;
      case 'deliveryReceipt':
        return <Receipt
          navigator={navigator}
        />;
      default:
        return <GamePlaySelect
          nextState={(id) => {
            if (id) getDeliveryData(navigator, id);
            this.setState({ display: 'deliveryReceipt' });
          }}
          navigator={navigator}
          didMount={() => { this.setState({ display: 'gamePlaySelect' }); }}
        />;
    }
  }
  _renderBtn(display, ship) {
    if (ship && display === 'gamePlaySelect') return [];
    const {
      confirmPlaySelect,
      getLogisticQuote,
      confirmDelivery,
      showTracking,
      navigator,
    } = this.props;
    const normal = (action, text, margin) => [
      {
        text,
        textStyle: {
          color: 'white',
          fontSize: 20,
          fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
        },
        btnStyle: {
          backgroundColor: '#4C4C4C',
          paddingVertical: 8,
          paddingHorizontal: 10,
          marginHorizontal: margin,
        },
        onPressFunction: action,
      },
    ];
    const withBack = (previous, action, text, margin) => [
      {
        text: 'back',
        textStyle: {
          color: '#4C4C4C',
          fontSize: 20,
          fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
        },
        borderColor: '#AFAFAF',
        btnStyle: {
          backgroundColor: '#EFEFEF',
          paddingVertical: 8,
          paddingHorizontal: 10,
          marginHorizontal: margin,
        },
        onPressFunction: () => this.setState({ display: previous }),
      },
      normal(action, text, margin)[0],
    ];
    switch (display) {
      case 'gamePlaySelect':
        return normal(
          () => confirmPlaySelect(() => this.setState({ display: 'logisticForm' })),
          'ship',
          0,
        );
      case 'logisticForm':
        return withBack(
          'gamePlaySelect',
          () => {
            if (!this.state.alertShown) {
              Alert.alert(
                `Address Correct ? ${emoji.get('truck')}`,
                `Otherwise, you prize(s) will be lost ${emoji.get('worried')}` ,
                [
                  { text: 'Let me check!', onPress: () => this.setState({ alertShown: true }) },
                ],
                { cancelable: false },
              );
            } else {
              getLogisticQuote(navigator, () => this.setState({ display: 'quoteSelect' }));
            }
          },
          'confirm',
          5,
        );
      case 'quoteSelect':
        return withBack(
          'logisticForm',
          () => confirmDelivery(navigator, () => this.setState({ display: 'gamePlaySelect' })),
          'confirm',
          5,
        );
      // user check the delivery details of the prize
      case 'deliveryReceipt':
        return [
          {
            text: 'back',
            textStyle: {
              color: 'white',
              fontSize: 20,
              fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
            },
            btnStyle: {
              backgroundColor: '#4C4C4C',
              paddingVertical: 8,
              paddingHorizontal: 10,
              marginHorizontal: 5,
            },
            onPressFunction: () => this.setState({ display: 'gamePlaySelect' }),
          },
          {
            text: 'tracking',
            textStyle: {
              color: 'white',
              fontSize: 20,
              fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
            },
            btnStyle: {
              backgroundColor: '#E63946',
              paddingVertical: 8,
              paddingHorizontal: 10,
              marginHorizontal: 5,
            },
            borderColor: '#8E2633',
            icon: {
              name: 'truck',
              size: 20,
              color: 'white',
            },
            onPressFunction: () => showTracking(navigator),
          },
        ];
      default:
        return null;
    }
  }
  render() {
    const { navigator } = this.props;
    const { display } = this.state;
    const tabs = [
      {
        name: 'ready',
        content: this._renderContent(display),
        buttons: this._renderBtn(display),
      },
      {
        name: 'sent',
        content: this._renderShip(display),
        buttons: this._renderBtn(display, true),
      },
    ];
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
        <KeyboardAvoidingView
          behavior="position"
          style={styles.keyboardView}
        >
          <Animated.View style={[this._opacityAnimation()]}>
            <MessageBox
              type="left"
              tabs={tabs}
              promptString="deliveryPrompt"
            />
          </Animated.View>
          <Animated.View style={[this._position.getLayout()]}>
            <Telebot
              status="fly"
              height={width * 0.3}
              width={width * 0.3}
            />
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  keyboardView: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
  },
  telebot: {
    bottom: 60,
    left: 0,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmPlaySelect,
    getUserInfo,
    getLogisticQuote,
    resetLogistic,
    confirmDelivery,
    showTracking,
    playUISound,
    getDeliveryData,
    // trackScreen,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Delivery);
