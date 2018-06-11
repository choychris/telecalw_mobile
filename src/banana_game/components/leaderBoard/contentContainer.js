import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SelectType from '../selectTab';
import Ranking from './ranking';
import Config from '../../utils/config';

const { deviceWidth } = Config;

const offSet = ((deviceWidth * (7 / 8)) - 40) / 3;

class LeaderboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabContent: props.endGame ? ['Current\nPeriod'] :
        [
          'Current\nPeriod',
          'Last\nPeriod',
          'Weekly\nBest',
        ],
    };
    this.onTabPress = this.onTabPress.bind(this);
  }

  onTabPress(index) {
    this.setState({ tab: index }, () => {
      console.log(this.state.tab, 'tapped');
    });
  }

  render() {
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
        <Ranking period={this.state.tab} />
        <TouchableOpacity style={styles.buttonStyle}>
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
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 8,
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
  buttonStyle: {
    alignSelf: 'center',
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 25,
    backgroundColor: '#4A66FF',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
  },
});

export default LeaderboardContent;
