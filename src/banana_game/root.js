import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../components/utilities/backgroundImage';
import TubeBoard from './containers/tubeBoard';
import Leaderboard from './containers/leaderboard';
import HomePage from './containers/homePage';

const RootContainer = ({ gameStart, leaderboard, navigator }) => {
  const viewLogic = () => {
    if (gameStart) {
      return <TubeBoard />;
    }
    if (leaderboard) {
      return <Leaderboard endGame={false} navigator={navigator} />;
    }
    return <HomePage navigator={navigator} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <BackgroundImage />
      { viewLogic() }
    </View>
  );
};

const mapStateToProps = state =>
  ({
    gameStart: state.bananaGame.startGame.startGame,
    leaderboard: state.bananaGame.leaderboard.showBoard,
  });

export default connect(mapStateToProps, null)(RootContainer);
