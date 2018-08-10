import React from 'react';
import { View, StyleSheet } from 'react-native';
// import emoji from 'node-emoji';

// const emojis = [
//   emoji.get('star2'),
//   emoji.get('full_moon'),
//   emoji.get('earth_africa'),
//   emoji.get('earth_americas'),
// ];

const Box = ({
  boxSize, pos, animateV, size, show,
}) => {
  const backgroundColor = (show && pos >= animateV && pos < animateV + size) ?
    'rgba(62,19,226,0.7)' : null;
  return (
    <View style={[
      styles.container,
      { height: boxSize, width: boxSize, backgroundColor },
    ]}
    >
      {/* {
        backgroundColor ?
          <Text style={styles.textStyle}>
            {emojis[size - 1]}
          </Text> : null
      } */}
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
