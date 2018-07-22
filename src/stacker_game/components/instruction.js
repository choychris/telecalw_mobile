import React from 'react';
import {
  View,
  // Text,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles as style } from './home/winners/winHistory';
import Config from '../config/constants';

const insturc = require('../images/instruction.png');

const Instruction = ({ onClose }) => (
  <View
    style={[
      style.container,
      styles.container,
    ]}
  >
    <Icon
      name="times"
      size={22}
      color="black"
      style={style.iconStyle}
      onPress={onClose}
    />
    {/* <Text style={style.headerStyle}>How to Play?</Text> */}
    <Image
      source={insturc}
      style={styles.imageStyle}
    />
  </View>
);

const { width, height } = Config;
const styles = StyleSheet.create({
  container: {
    height: height / 1.2,
    top: height / 40,
  },
  imageStyle: {
    width: width * 0.85,
    height: height / 1.35,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 50,
  },
});

export default Instruction;
