import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import emoji from 'node-emoji';

const ticket = require('../../../../../assets/utilities/ticket.png');

const ListItem = ({ index, name, wins }) => (
  <View style={styles.container}>
    <Text style={styles.textStyle}>{`${emoji.get('sports_medal')}${index + 1}`}</Text>
    <Text style={styles.textStyle}>{name}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.textStyle}>{wins}</Text>
      <Image
        source={ticket}
        style={styles.imageStyle}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 10,
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  imageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default ListItem;
