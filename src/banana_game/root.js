import React from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import TubeBoard from './containers/tubeBoard';
import HomePage from './containers/homePage';

const skyBackground = require('./images/background.png');

const RootContainer = ({ gameStart }) =>
  (
    <ImageBackground
      resizeMode="stretch"
      style={{ flex: 1 }}
      source={skyBackground}
    >
      {gameStart ? <TubeBoard /> : <HomePage />}
    </ImageBackground>
  );

const mapStateToProps = state =>
  ({
    gameStart: state.startGame.startGame,
  });

export default connect(mapStateToProps, null)(RootContainer);
