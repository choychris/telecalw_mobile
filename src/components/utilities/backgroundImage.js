import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const backgroundImg = require('../../../assets/background/background_bright.png');
const authBackgroundImg = require('../../../assets/background/background_auth.png');

class BackgroundImage extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { type } = this.props;
    const backgroundSetting = (type === 'auth') ? authBackgroundImg : backgroundImg;
    return (
      <View style={styles.container}>
        <Image
          source={backgroundSetting}
          style={[styles.image]}
          resizeMode="cover"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#263E50',
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default connect(null, null)(BackgroundImage);
