import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Tab extends Component {
  shouldComponentUpdate(nextProps) {
    const { selected } = this.props;
    return selected !== nextProps.selected;
  }
  render() {
    const {
      name, string, selected, onPress,
    } = this.props;
    const color = (selected === true) ? { color: '#C52D2D' } : { color: '#011627' };
    const underline = (selected === true) ? { borderBottomWidth: 5, borderColor: '#C52D2D' } : null;
    return (
      <TouchableOpacity
        disabled={(selected === true)}
        style={[styles.tab, underline]}
        onPress={onPress}
      >
        <Text style={[styles.title, color]}>
          {string[name]}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 2,
  },
  title: {
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default connect(null, null)(Tab);
