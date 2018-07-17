import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import Config from '../../config/constants';

const { boxSize } = Config;

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

const styles = StyleSheet.create({
  container: {
    height: boxSize,
    width: boxSize,
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
