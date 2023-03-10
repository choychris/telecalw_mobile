import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectType from '../selectTab';
import Ranking from './ranking';
import Config, { shadow } from '../../utils/config';
import { navigateGame } from '../../actions/startGameAction';
import {
  viewLeaderBoard, getRankData,
  clearData, getWeeklyBest,
} from '../../actions/leaderboardAction';
import locale from '../../utils/i18n/language';

const { deviceWidth } = Config;

const offSet = ((deviceWidth * (7 / 8)) - 40) / 3;

class LeaderboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabContent: props.endGame ? [locale(props.lang, 'current')] :
        [
          locale(props.lang, 'current'),
          locale(props.lang, 'last'),
          locale(props.lang, 'weekly'),
        ],
    };
    props.getRankData(true);
    this.onTabPress = this.onTabPress.bind(this);
    this.onDonePress = this.onDonePress.bind(this);
  }

  componentWillUnmount() {
    this.props.closeLb(false);
    this.props.clearData();
  }

  onTabPress(index) {
    const differentTab = (this.state.tab !== index);
    if (this.props.rankData && differentTab) {
      this.setState({ tab: index }, () => {
        if (index < 2) {
          const currentPeriod = (index === 0);
          this.props.getRankData(currentPeriod);
        } else {
          this.props.getWeeklyBest();
        }
      });
    }
  }

  onDonePress() {
    if (this.props.endGame) {
      this.props.toHome(false);
    } else {
      this.props.closeLb(false);
    }
  }

  render() {
    const {
      rankData, timeLeft, totalPlayer, lang,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Leaderboard</Text>
        <SelectType
          textStyle={styles.tabTextStyle}
          underLineStyle={styles.underLine}
          inputRange={[0, 1, 2]}
          outputRange={[-offSet, 0, offSet]}
          onTabPress={(index) => { this.onTabPress(index); }}
          tabs={this.state.tabContent}
        />
        <Ranking
          period={this.state.tab}
          rankData={rankData}
          timeLeft={timeLeft}
          totalPlayer={totalPlayer}
          lang={lang}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={this.onDonePress}>
          <Text style={styles.tabTextStyle}>DONE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerStyle: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 8,
    fontFamily: 'PixelOperator8-Bold',
    color: 'black',
  },
  tabTextStyle: {
    color: 'white',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  underLine: {
    alignSelf: 'center',
    marginHorizontal: 20,
    backgroundColor: 'white',
    width: 55,
    height: 4,
    marginTop: 3,
    marginBottom: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  buttonStyle: {
    alignSelf: 'center',
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 25,
    backgroundColor: '#4A66FF',
    ...shadow,
  },
});

const mapStateToProps = state =>
  ({
    rankData: state.bananaGame.leaderboard.rankData,
    timeLeft: state.bananaGame.leaderboard.timeLeft,
    totalPlayer: state.bananaGame.leaderboard.totalPlayer,
    lang: state.preference.language.locale,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    toHome: navigateGame,
    closeLb: viewLeaderBoard,
    getRankData,
    getWeeklyBest,
    clearData,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardContent);
