import React from 'react';
import { Image, Text, StyleSheet, Animated } from 'react-native';

const emoji = require('node-emoji');

const first = require('../../images/1stPlace.png');
const second = require('../../images/2ndPlace.png');
const third = require('../../images/3rdPlace.png');

const crowns = [first, second, third];
const animateValue = new Animated.Value(0);
const opacity = animateValue.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 1],
});

const listItem = ({ item, index }) => {
  Animated.timing(
    animateValue,
    {
      toValue: 1,
      duration: 500,
    },
  ).start();
  const { username, highestScore } = item;
  let { numberOfTrial } = item;
  let rank = item.rank || index + 1;
  let fontSize = 18;
  if (!rank) {
    rank = emoji.get('medal');
    fontSize = 30;
  }
  if (numberOfTrial === 0) numberOfTrial = 1;
  return (
    <Animated.View style={[
        styles.container,
        { opacity },
        item.self ? styles.selfIndictaor : null,
      ]}
    >
      { (rank < 4) ?
        <Image source={crowns[rank - 1]} style={styles.imageStyle} /> :
        <Text style={[styles.textStyle, { fontSize }]}>{rank}</Text> }
      <Text style={styles.textStyle}>{username}</Text>
      <Text style={styles.textStyle}>{highestScore} PTS</Text>
      <Text style={styles.textStyle}>{numberOfTrial} PLAYS</Text>
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
    fontFamily: 'PixelOperatorSC-Bold',
    textAlign: 'center',
    fontSize: 15,
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
