import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
// import * as Animatable from 'react-native-animatable';
import sample from 'lodash/sample';
import ResBtn from './btnComponent';
import Config from '../../../config/constants';

const cryFace = require('../../../images/cry.png');
const cuteFace = require('../../../images/cute.png');
const smiFace = require('../../../images/smile.png');
const screFace = require('../../../images/scre.png');
const bubble = require('../../../images/bubble.png');

const faceArray = [cryFace, cuteFace, smiFace, screFace];


function randomSpeak(end, lastRow, winning) {
  const normal = [
    'Wonderful!',
    'Good Job!',
    'You can win this!',
    'Keep it up!',
    'You are so good!',
    'Amazing!',
    'Nicely Done!',
    'Excellent!',
  ];
  if (lastRow === 1 && winning >= 0) return 'Congration!\nYou get the biggest Prize!';
  if (end) return 'So close!\nOne more game?';
  if (lastRow === 12) return "Let's get started.";
  if (lastRow === 3) return 'You just win\nthe first prize !';
  return sample(normal);
}

const Dialog = ({
  ended, onYesPress, onNoPress, row, win,
}) => (
  <View style={styles.constainer}>
    <View
      style={{ flex: 0.3 }}
    >
      <Image
        source={sample(faceArray)}
        style={styles.faceStyle}
      />
    </View>
    <View style={{ flex: 0.7 }}>
      <Image source={bubble} style={styles.imageStyle} />
      <Text style={styles.textStyle}>
        { randomSpeak(ended, row, win) }
      </Text>
      { ended ?
        <ResBtn onYesPress={onYesPress} onNoPress={onNoPress} /> :
        null
      }
    </View>
  </View>
);

const { playWidth } = Config;
const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    height: playWidth / 5,
  },
  faceStyle: {
    resizeMode: 'contain',
    width: playWidth / 5,
    height: playWidth / 6,
    alignSelf: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: (playWidth / 4) * 2,
    height: playWidth / 5,
  },
  textStyle: {
    position: 'absolute',
    textAlign: 'left',
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    color: 'black',
  },
});

const mapStateToProps = state => ({
  row: state.stackerGame.game.activeRow,
  win: state.stackerGame.game.win,
});

export default connect(mapStateToProps)(Dialog);
