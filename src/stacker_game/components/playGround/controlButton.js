import React from 'react';
import {
  Text,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import Config from '../../config/constants';

const { margin, boxSize } = Config;

const Button = ({ end, onPress }) => (
  <TouchableHighlight
    style={styles.container}
    onPressIn={onPress}
    disabled={end}
  >
    <Text style={styles.textStyle}>
      HIT
    </Text>
  </TouchableHighlight>
);
const isIOS = (Platform.OS === 'iOS');
const right = isIOS ? -(margin + 4) : 0;
const height = isIOS ? (margin - 4) : boxSize;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right,
    height,
    width: margin - 4,
    backgroundColor: '#F5A623',
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 4,
    marginBottom: 1,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
  },
});

const mapStateToProps = state => ({
  end: state.stackerGame.game.end,
});

export default connect(mapStateToProps)(Button);
