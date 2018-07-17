import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Animated, StatusBar } from 'react-native';
import BackgroundImage from '../components/utilities/backgroundImage';
import BackButton from '../components/navBar/container';
import Playground from './components/playGround/playLayout';
import Buttons from './components/home/buttons';
import Dialog from './components/home/dialog/layout';
import StackerLogo from './components/home/logo';
import Config from './config/constants';
import { switchGameState, restartGame } from './actions/homeAction';
import WinHistory from './components/winHistory';

const { height } = Config;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      buttonShow: false,
      winnerShow: false,
    };
    this.buttonDrop = new Animated.Value(300);
    this.playgroundDrop = new Animated.Value(600);
    this.detailsAnimate = new Animated.Value(600);
    this.restart = this.restart.bind(this);
    this.switchingState = this.switchingState.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.endPlay = this.endPlay.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameEnded) {
      this.endingBounceUp();
    }
  }

  endingBounceUp() {
    const jumpValue = [20, -200, -100, (-height / 2) + 50];
    const animateArray = [];
    for (let i = 0; i < jumpValue.length; i += 1) {
      animateArray.push(Animated.timing(
        this.buttonDrop,
        {
          toValue: jumpValue[i],
          duration: 200,
          useNativeDriver: true,
        },
      ));
    }

    Animated.sequence(animateArray).start(() => {
      this.setState({ buttonShow: true });
    });
  }

  switchingState() {
    Animated.timing(
      this.buttonDrop,
      {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      },
    ).start(() => {
      this.props.switchGameState();
      Animated.timing(
        this.buttonDrop,
        {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        },
      ).start();
    });
  }

  showDetails(show) {
    this.setState({ winnerShow: !this.state.winnerShow });
    const positionX = show ? 0 : 600;
    Animated.timing(
      this.detailsAnimate,
      {
        toValue: positionX,
        duration: 700,
        useNativeDriver: true,
      },
    ).start();
  }

  endPlay() {
    this.switchingState();
    this.setState({ buttonShow: false });
    this.props.restartGame();
  }

  restart() {
    this.setState({ buttonShow: false });
    this.props.restartGame();
    Animated.timing(
      this.buttonDrop,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      },
    ).start();
  }

  startAnimation() {
    const button = Animated.timing(
      this.buttonDrop,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      },
    );
    const playground = Animated.timing(
      this.playgroundDrop,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      },
    );
    Animated.sequence([playground, button]).start();
  }

  render() {
    const { gameStarted, gameEnded, navigator } = this.props;
    const logoDrop = this.buttonDrop.interpolate({
      inputRange: [0, 300],
      outputRange: [height / 3, -800],
    });
    const logoPositionX = this.detailsAnimate.interpolate({
      inputRange: [0, 600],
      outputRange: [-600, 0],
    });
    return (
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <BackgroundImage />
        <StatusBar hidden />
        { gameStarted ?
          <View style={{ height: 45 }} /> :
          <BackButton back coins navigator={navigator} /> }
        <Animated.View
          style={{
            transform: [{ translateX: this.detailsAnimate }],
            zIndex: 3,
          }}
        >
          <WinHistory />
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              { translateY: logoDrop },
              { translateX: logoPositionX },
            ],
            zIndex: 3,
          }}
        >
          { gameStarted ? null : <StackerLogo /> }
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              { translateY: this.playgroundDrop },
              { translateX: logoPositionX },
            ],
          }}
        >
          <Playground gameStarted={gameStarted} />
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              { translateY: this.buttonDrop },
              { translateX: logoPositionX },
              { scale: gameEnded ? 1.3 : 1 },
            ],
          }}
        >
          { !gameStarted ?
            <Buttons
              start={this.switchingState}
              winner={() => { this.showDetails(true); }}
            /> :
            <Dialog
              ended={this.state.buttonShow}
              onYesPress={this.restart}
              onNoPress={this.endPlay}
            />}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gameStarted: state.stackerGame.home.start,
  gameEnded: state.stackerGame.game.end,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  switchGameState,
  restartGame,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
