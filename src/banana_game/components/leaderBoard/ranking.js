import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, FlatList } from 'react-native';
import Stats, { Header } from './statistic';
import ListItem from './listItem';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.rankData !== nextProps.rankData;
  }
  keyExtractor = () => Math.random();

  renderList() {
    const { rankData, lang } = this.props;
    // console.log(rankData);
    // console.log(rankData.weeklyTopThree);
    if (this.props.period === 2) {
      return (
        <View style={styles.subContainer}>
          {
            rankData.weeklyTopThree.map((each, i) =>
              <ListItem index={i} key={Math.random()} item={each} />)
          }
          <Header lang={lang} />
          <View>
            <FlatList
              data={rankData.allWinner}
              renderItem={({ item }) =>
                <ListItem item={item} />
              }
              keyExtractor={this.keyExtractor}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.subContainer}>
        {rankData.slice(0, 3).map(each => <ListItem key={each.username} item={each} />)}
        <View style={styles.circleView} />
        <View style={styles.circleView} />
        {rankData.slice(3, 6).map(each => <ListItem key={each.username} item={each} />)}
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
          {'Oh ! \n There is no plays yet'}
        </Text>
      );
    }
    return this.renderList();
  }

  render() {
    let { timeLeft } = this.props;
    const { totalPlayer, period, lang } = this.props;
    const weekly = (period === 2);
    if (timeLeft < 0) timeLeft = 0;
    return (
      <View style={styles.container}>
        <Stats
          weekly={weekly}
          timeLeft={timeLeft}
          totalPlayer={totalPlayer}
          lang={lang}
        />
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
    textAlign: 'center',
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

export default Ranking;
