import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Config from '../../../utils/config';

const NavigateButton = ({ image, text, onPress }) =>
  (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <Image source={image} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#4A66FF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    marginVertical: 7,
    marginLeft: 10,
    marginRight: 16,
    maxWidth: 200,
    ...Config.shadow,
  },
  imageStyle: {
    flex: 0.8,
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  textStyle: {
    flex: 1,
    color: 'white',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontFamily: 'PixelOperator8-Bold',
  },
});

export default NavigateButton;
