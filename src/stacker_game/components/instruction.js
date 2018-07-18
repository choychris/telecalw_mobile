import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles as style } from './home/winners/winHistory';
import Config from '../config/constants';

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
    <Text style={style.headerStyle}>How to win?</Text>
    <Image />
  </View>
);

const { height } = Config;
const styles = StyleSheet.create({
  container: {
    height: height / 1.2,
    top: height / 20,
  },
});

export default Instruction;
