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

const en = require('../images/instruc_en.png');
const zhHant = require('../images/instruc_zh.png');

const images = {
  en,
  zhHant,
};

const Instruction = ({ onClose, locale }) => (
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
      source={images[locale]}
      style={styles.imageStyle}
    />
  </View>
);

const { width, height } = Config;
const styles = StyleSheet.create({
  container: {
    height: height * 0.7,
    top: height / 12,
  },
  imageStyle: {
    width: width * 0.85,
    height: height * 0.6,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 50,
  },
});

export default Instruction;
