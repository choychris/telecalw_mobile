import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Config from '../../config/constants';

const NavButton = ({
  text, onPress, color, pic, end,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color },
      ]}
      disabled={end}
    >
      { pic ? <Image source={pic} style={styles.image} /> : null }
      <Text style={styles.textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  </View>
);

const { playWidth } = Config;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: (playWidth / 5),
    height: (playWidth / 5),
    justifyContent: 'center',
    borderRadius: 8,
    ...Config.shadow,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontFamily: 'PixelOperatorSC-Bold',
    fontSize: 16,
  },
  image: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
});

export default NavButton;
