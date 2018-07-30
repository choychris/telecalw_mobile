import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import emoji from 'node-emoji';

const ticket = require('../../../../../assets/utilities/ticket.png');

const ListItem = ({ index, name, wins }) => (
  <View style={styles.container}>
    <Text style={[styles.textStyle, { flex: 1 }]}>
      {`${emoji.get('sports_medal')}${index + 1}`}
    </Text>
    <Text style={[styles.textStyle, { flex: 3 }]}>{name}</Text>
    <View style={styles.inner}>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 10,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textStyle: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    fontSize: 16,
    flexWrap: 'wrap',
  },
  imageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default ListItem;
