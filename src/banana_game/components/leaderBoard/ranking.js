import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Stats from './statistic';
import ListItem from './listItem';
import { getRankData } from '../../actions/leaderboardAction';

class Ranking extends Component {
  constructor(props) {
    super(props);
    const currentPeriod = (props.period === 0);
    props.getRankData(props.gameId, currentPeriod);
    this.renderList = this.renderList.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  renderList() {
    const { rankData } = this.props;
    if (rankData.length < 6) {
      return (
        <View style={styles.subContainer}>
          {rankData.map(each => <ListItem key={each.rank} item={each} />)}
          <View style={styles.circleView} />
          <View style={styles.circleView} />
          <View style={styles.circleView} />
        </View>
      );
    }
    return (
      <View style={styles.subContainer}>
        {rankData.slice(0, 3).map(each => <ListItem key={each.rank} item={each} />)}
        <View style={styles.circleView} />
        <View style={styles.circleView} />
        {rankData.slice(3, 6).map(each => <ListItem key={each.rank} item={each} />)}
        <View style={styles.circleView} />
        <View style={styles.circleView} />
      </View>
    );
  }

  renderLoading() {
    const { rankData } = this.props;
    if (!rankData) {
      return (
        <ActivityIndicator
          style={styles.loading}
          color="#0000ff"
        />
      );
    }
    if (rankData.length === 0) {
      return (
        <Text style={styles.textStyle}>
          There is no plays yet
        </Text>
      );
    }
    return this.renderList();
  }

  render() {
    let { timeLeft } = this.props;
    const { totalPlayer } = this.props;
    if (timeLeft < 0) timeLeft = 0;
    return (
      <View style={styles.container}>
        <Stats timeLeft={timeLeft} totalPlayer={totalPlayer} />
        { this.renderLoading() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  loading: {
    alignSelf: 'center',
    flex: 1,
  },
  textStyle: {
    alignSelf: 'center',
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleView: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
    width: 10,
    height: 10,
    borderRadius: 10,
    margin: 7,
  },
});

const mapStateToProps = state =>
  ({
    rankData: state.bananaGame.leaderboard.rankData,
    timeLeft: state.bananaGame.leaderboard.timeLeft,
    totalPlayer: state.bananaGame.leaderboard.totalPlayer,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getRankData,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
