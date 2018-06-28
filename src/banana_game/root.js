import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BackgroundImage from '../components/utilities/backgroundImage';
import TubeBoard from './containers/tubeBoard';
import Leaderboard from './containers/leaderboard';
import HomePage from './containers/homePage';
import { playBackgroundMusic } from '../utils/sound';

class RootContainer extends Component {
  constructor() {
    super();
    this.viewLogic = this.viewLogic.bind(this);
  }

  componentDidMount() {
    this.music = this.props.playBackgroundMusic('A0001');
  }

  componentWillUnmount() {
    if (this.music) {
      this.music.stop(() => this.music.release);
    }
  }

  viewLogic() {
    const {
      gameStart, leaderboard, navigator, token,
    } = this.props;
    if (gameStart) {
      return <TubeBoard />;
    }
    if (leaderboard) {
      return <Leaderboard endGame={false} navigator={navigator} />;
    }
    return <HomePage navigator={navigator} token={token} />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage />
        { this.viewLogic() }
      </View>
    );
  }
}

const mapStateToProps = state =>
  ({
    gameStart: state.bananaGame.startGame.startGame,
    leaderboard: state.bananaGame.leaderboard.showBoard,
    token: state.auth.token.lbToken,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    playBackgroundMusic,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
