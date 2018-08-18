import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';


class Signal extends Component {
  shouldComponentUpdate(nextProps) {
    const { status, language } = this.props;
    return status !== nextProps.status || language.locale !== nextProps.language.locale;
  }

  renderDisplay(status) {
    const { language } = this.props;
    const { string } = language;
    const displayString = (status === true) ? 'online' : 'offline';
    return (
      <Text style={styles.text}>
        {string[displayString]}
      </Text>
    );
  }
  render() {
    const { status } = this.props;
    const signalIcon = (status === true) ?
      { color: '#2ECC71', name: 'signal' } :
      { color: '#E63946', name: 'signal-off' };
    return (
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <Icon
          name={signalIcon.name}
          size={20}
          color={signalIcon.color}
          style={styles.icon}
        />
        {(status !== null) ?
          this.renderDisplay(status) :
          <ActivityIndicator size="small" color="white" />}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.preference.language,
    status: state.game.network.status,
  };
}

export default connect(mapStateToProps, null)(Signal);
