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
  text, onPress, color, pic,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color },
      ]}
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
    width: (playWidth / 4) - 15,
    height: (playWidth / 4) - 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
});

export default NavButton;
