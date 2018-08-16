import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
// import * as Animatable from 'react-native-animatable';
import sample from 'lodash/sample';
import ResBtn from './btnComponent';
import Config, { rewards } from '../../../config/constants';
import Strings from '../../../config/i18n';

const cryFace = require('../../../images/cry.png');
const cuteFace = require('../../../images/cute.png');
const smiFace = require('../../../images/smile.png');
const screFace = require('../../../images/scre.png');
const bubble = require('../../../images/bubble.png');

const faceArray = [cryFace, cuteFace, smiFace, screFace];


function randomSpeak(end, lastRow, winning, locale) {
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
  if (lastRow === 1 && winning >= rewards.major) return Strings(locale, 'congrat');
  if (end) return Strings(locale, 'soClose');
  if (lastRow === 12) return Strings(locale, 'start');
  if (lastRow === 3) return Strings(locale, 'miniWin');
  return sample(normal);
}

const Dialog = ({
  ended, onYesPress, onNoPress, row, win, locale,
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
        { randomSpeak(ended, row, win, locale) }
      </Text>
      { ended ?
        <ResBtn onYesPress={onYesPress} onNoPress={onNoPress} /> :
        null
      }
    </View>
  </View>
);

const android = (Platform.OS === 'ios') ? 0 : 30;
const marginTop = (Platform.OS === 'ios') ? 20 : 0;
const { playWidth } = Config;
const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop,
    height: (playWidth / 5) + android,
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
    padding: 8,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    fontFamily: 'PixelOperator-Bold',
    fontSize: 17,
    color: 'black',
  },
});

const mapStateToProps = state => ({
  row: state.stackerGame.game.activeRow,
  win: state.stackerGame.game.win,
});

export default connect(mapStateToProps)(Dialog);
