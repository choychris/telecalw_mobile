import React, { Component } from 'react';
import { Image, StyleSheet, ImageBackground, Text } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const bigTube = require('../../../../assets/miniGame/playTube.png');

class TubeBoard extends Component {
  render() {
    return (
      <ImageBackground
        source={bigTube}
      >
        <Text>Text here</Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({});

export default connect()(TubeBoard);
