import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Animated } from 'react-native';
import BackgroundImage from '../components/utilities/backgroundImage';
import Playground from './components/playGround/playLayout';
import Buttons from './components/home/buttons';
import Dialog from './components/home/dialog/layout';
import StackerLogo from './components/home/logo';
import Config from './config/constants';
import { switchGameState, restartGame } from './actions/homeAction';

const { height } = Config;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      buttonShow: false,
    };
    this.buttonDrop = new Animated.Value(300);
    this.playgroundDrop = new Animated.Value(600);
    this.restart = this.restart.bind(this);
    this.switchingState = this.switchingState.bind(this);
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
    const { gameStarted, gameEnded } = this.props;
    const logoDrop = this.buttonDrop.interpolate({
      inputRange: [0, 300],
      outputRange: [height / 3, -800],
    });
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage />
        <Animated.View
          style={{
            transform: [{ translateY: logoDrop }],
            zIndex: 3,
          }}
        >
          { gameStarted ? null : <StackerLogo /> }
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateY: this.playgroundDrop }],
          }}
        >
          <Playground gameStarted={gameStarted} />
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              { translateY: this.buttonDrop },
              { scale: gameEnded ? 1.3 : 1 },
            ],
          }}
        >
          { !gameStarted ?
            <Buttons
              start={this.switchingState}
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
