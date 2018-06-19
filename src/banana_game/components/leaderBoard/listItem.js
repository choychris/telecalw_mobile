import React from 'react';
import { Image, Text, StyleSheet, Animated } from 'react-native';

const first = require('../../images/1stPlace.png');
const second = require('../../images/2ndPlace.png');
const third = require('../../images/3rdPlace.png');

const crowns = [first, second, third];
const animateValue = new Animated.Value(0);
const opacity = animateValue.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 1],
});

const listItem = ({ item }) => {
  Animated.timing(
    animateValue,
    {
      toValue: 1,
      duration: 500,
    },
  ).start();
  const {
    rank, username, highestScore, numberOfTrial,
  } = item;
  return (
    <Animated.View style={[
        styles.container,
        { opacity },
        item.self ? styles.selfIndictaor : null,
      ]}
    >
      { (item.rank < 4) ?
        <Image source={crowns[item.rank - 1]} style={styles.imageStyle} /> :
        <Text style={[styles.textStyle, { fontSize: 18 }]}>{rank}</Text> }
      <Text style={styles.textStyle}>{username}</Text>
      <Text style={styles.textStyle}>{highestScore}PTS</Text>
      <Text style={styles.textStyle}>{numberOfTrial}PLAYS</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
  },
  imageStyle: {
    width: 30,
    height: 30,
    flex: 1,
    resizeMode: 'contain',
  },
  textStyle: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    flexWrap: 'wrap',
  },
  selfIndictaor: {
    backgroundColor: 'rgba(74,144,226,0.6)',
    shadowOffset: { height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.8,
  },
});

export default listItem;
