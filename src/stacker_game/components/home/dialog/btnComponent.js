import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Config from '../../../config/constants';

const ReponseBtn = ({ onYesPress, onNoPress }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={styles.button}
      onPress={onYesPress}
    >
      <Text style={styles.textStyle}>
        YES
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={onNoPress}
    >
      <Text style={styles.textStyle}>
        NO
      </Text>
    </TouchableOpacity>
  </View>
);

const { playWidth } = Config;
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: (playWidth / 4) * 2,
  },
  button: {
    width: 50,
    height: 25,
    backgroundColor: '#D8D8D8',
    margin: 5,
    borderRadius: 3,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'PixelOperator-Bold',
    fontSize: 18,
  },
});

export default ReponseBtn;
