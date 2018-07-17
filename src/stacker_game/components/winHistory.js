import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Config from '../config/constants';

class WinHistory extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ alignSelf: 'flex-end', margin: 5 }}
          onPress={() => { console.warn('hi'); }}
        >
          X
        </Text>
        <Text style={styles.headerStyle}>Winners of Today</Text>
        <View style={styles.section}>
          <Text>YO</Text>
        </View>
      </View>
    );
  }
}

const { width, height } = Config;
const styles = StyleSheet.create({
  container: {
    ...Config.shadow,
    position: 'absolute',
    alignSelf: 'center',
    top: height / 6,
    left: 20,
    height: height * 0.6,
    width: width - 40,
    borderRadius: 15,
    backgroundColor: '#D8D8D8',
    justifyContent: 'flex-start',
  },
  headerStyle: {
    textAlign: 'center',
    fontSize: 20,
  },
  section: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
  },
});

export default WinHistory;
