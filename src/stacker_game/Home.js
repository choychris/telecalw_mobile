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
import {
  switchGameState,
  restartGame,
  getWinHistory,
} from './actions/homeAction';
import WinHistory from './components/home/winners/winHistory';
import Instruction from './components/instruction';

const { height } = Config;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      buttonShow: false,
      winner: false,
      how: false,
    };
    this.buttonDrop = new Animated.Value(300);
    this.playgroundDrop = new Animated.Value(600);
    this.detailsAnimate = new Animated.Value(600);
    this.getDetailInformation = this.getDetailInformation.bind(this);
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

  getDetailInformation() {
    const { winner, how } = this.state;
    if (winner) {
      return <WinHistory
        onClose={() => this.showDetails(false)}
        getWinners={this.props.getWinHistory}
        winners={this.props.winners}
      />;
    } else if (how) {
      return <Instruction onClose={() => this.showDetails(false)} />;
    }
    return null;
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

  showDetails(show, type) {
    if (show) {
      this.setState({ [type]: true });
    }
    const positionX = show ? 0 : 600;
    Animated.timing(
      this.detailsAnimate,
      {
        toValue: positionX,
        duration: 700,
        useNativeDriver: true,
      },
    ).start(() => {
      if (!show) {
        this.setState({ how: false, winner: false });
      }
    });
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
        duration: 400,
        useNativeDriver: true,
      },
    );
    const playground = Animated.timing(
      this.playgroundDrop,
      {
        toValue: 0,
        delay: 100,
        duration: 400,
        useNativeDriver: true,
      },
    );
    Animated.sequence([playground, button]).start();
  }

  render() {
    const { gameStarted, gameEnded, navigator } = this.props;
    const logoDrop = this.buttonDrop.interpolate({
      inputRange: [0, 300],
      outputRange: [height / 3, -600],
    });
    const logoPositionX = this.detailsAnimate.interpolate({
      inputRange: [0, 600],
      outputRange: [-600, 0],
    });
    return (
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <BackgroundImage />
        <StatusBar hidden />
        <Animated.View
          style={{
            transform: [
              { translateX: logoPositionX },
            ],
          }}
        >
          { gameStarted ?
            <View style={{ height: 45 }} /> :
            <BackButton
              back
              coins
              navigator={navigator}
            />
          }
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateX: this.detailsAnimate }],
            zIndex: 3,
          }}
        >
          { this.getDetailInformation() }
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
              navigator={navigator}
              winner={() => { this.showDetails(true, 'winner'); }}
              how={() => { this.showDetails(true, 'how'); }}
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
  winners: state.stackerGame.home.winners,
  gameEnded: state.stackerGame.game.end,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  switchGameState,
  restartGame,
  getWinHistory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
