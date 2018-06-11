import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import Config from '../../../utils/config';

const coins = require('../../../images/telecoins_single.png');

const Item = ({
  title, details, coin, selected, onPress
}) => {
  const selectedStyle = selected ?
    { backgroundColor: '#465F96' } : { ...Config.shadow };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.buttonStyle, selectedStyle]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
        <View style={styles.container}>
          <Image source={coins} style={styles.imageStyle} />
          <Text style={styles.buttonText}>{coin}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.detailsText}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonStyle: {
    backgroundColor: '#4A90E2',
    borderRadius: 14,
    alignItems: 'center',
    minWidth: 95,
    margin: 3,
    padding: 8,
  },
  imageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  detailsText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
    padding: 8,
    fontStyle: 'italic',
  },
});

export default Item;
