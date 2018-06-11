import React, { Component } from 'react';
import { Image, StyleSheet, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Config from '../utils/config';
import GameAction from '../actions/gameActions';
import FlyDisplay from '../components/game/timeDisplay';
import Score from '../components/game/score';
import Banana from '../components/game/banana';
import ReadySign from '../components/game/readySign';
import EndGamePopUp from './endGame';
import Leaderboard from './leaderboard';

const { horizontalScale, verticalScale } = Config;
const { getNewBananaSet, shiftList, clearList } = GameAction;
const bigTube2 = require('../images/playTube2.png');

class TubeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
      reminingTime: props.timeItem ? 50 : 40,
      gameFinished: false,
      showLeaderBoard: false,
      canRetry: true,
      score: 0,
    };
    this.readyOrFinsih = this.readyOrFinsih.bind(this);
    this.getScore = this.getScore.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }

  componentDidMount() {
    this.trackTime();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateChangeUpdate = (this.state !== nextState);
    const bananasChange = (this.props.positionList !== nextProps.positionList);
    return (stateChangeUpdate || bananasChange);
  }

  getScore() {
    if (this.state.reminingTime < 1) { return; }
    this.setState({ score: this.state.score + 1 });
    this.props.shiftList();
  }

  trackTime() {
    setTimeout(() => {
      this.setState({ startGame: true });
      this.props.getNewBananaSet();
    }, 3000);

    const countDown = setInterval(() => {
      if (this.state.reminingTime <= 1) {
        this.setState({ gameFinished: true });
        this.props.clearList();
        clearInterval(countDown);
      }
      if (this.state.startGame) {
        this.setState({ reminingTime: this.state.reminingTime - 1 });
      }
    }, 1000);
  }

  showBoard() {
    this.setState({ showLeaderBoard: true });
  }

  readyOrFinsih() {
    if (!this.state.gameFinished) {
      return <ReadySign />;
    }
    if (this.state.showLeaderBoard) {
      return <Leaderboard />;
    }
    return (
      <EndGamePopUp
        canRetry={this.state.canRetry}
        playAgain={this.playAgain}
        showBoard={this.showBoard}
        score={this.state.score}
      />
    );
  }

  playAgain() {
    if (this.state.canRetry) {
      this.setState({
        reminingTime: 10,
        startGame: false,
        gameFinished: false,
        canRetry: false,
      });
      this.trackTime();
    }
  }

  render() {
    const {
      positionList, numberList, level, ascending,
    } = this.props;
    const { reminingTime, score } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          source={bigTube2}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <View style={{ flex: 0.1 }} />
        <View style={styles.rowContainer}>
          <FlyDisplay reminingTime={reminingTime} />
          <Score totalScore={score} ascending={ascending} />
        </View>
        <View style={styles.tubeContainer} >
          { (positionList && positionList.length > 0) ?
            positionList.map((obj, i) =>
              <Banana
                key={(`${level}:${obj.x * obj.y}`)}
                imageWidth={obj.size}
                bottomPosition={obj.y}
                leftPosition={obj.x}
                number={numberList[i]}
                getScore={this.getScore}
              />) : this.readyOrFinsih()
          }
          {/* <Banana
            imageWidth={120}
            bottomPosition={440 - 120}
            leftPosition={370 - 120}
          /> */}
        </View>
      </View>
    );
  }
}
// 0 - 320 height
// 0 - 270 width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  tubeContainer: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 0,
    width: horizontalScale(375),
    height: verticalScale(500.25),
  },
});

const mapStateToProps = state => ({
  positionList: state.game.positionList,
  numberList: state.game.numberList,
  level: state.game.level,
  ascending: state.game.ascending,
  timeItem: state.startGame.addTime,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getNewBananaSet,
    shiftList,
    clearList,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(TubeBoard);
