import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import emoji from 'node-emoji';

const emojis = [
  emoji.get('scream_cat'),
  emoji.get('heart_eyes_cat'),
  emoji.get('smiley_cat'),
  emoji.get('smile_cat'),
];

const Box = ({
  boxSize, pos, animateV, size, show,
}) => {
  const backgroundColor = (show && pos >= animateV && pos < animateV + size) ?
    '#50E3C2' : null;
  return (
    <View style={[
      styles.container,
      { height: boxSize, width: boxSize, backgroundColor },
    ]}
    >
      {
        backgroundColor ?
          <Text style={styles.textStyle}>
            {emojis[size - 1]}
          </Text> : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
    borderRadius: 3,
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    margin: 1,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Box;
