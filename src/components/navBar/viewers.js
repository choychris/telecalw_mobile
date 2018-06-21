import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import styles from './styles';


class Viewers extends Component {
  shouldComponentUpdate(nextProps) {
    const { machine } = this.props;
    return nextProps.machine !== machine;
  }
  renderLoading() {
    return <ActivityIndicator size="small" color="white" />;
  }
  renderDisplay(viewers) {
    return (
      <Text style={styles.text}>
        {viewers}
      </Text>
    );
  }
  renderMemberList(members) {
    return (
      <ScrollView
        horizontal
      >
        {Object.keys(members).map((key, index) => ((index <= 2 && members[key].picture !== undefined) ? <Image
          key={key}
          style={styles.avatar}
          source={{ uri: members[key].picture }}
        /> : null))}
      </ScrollView>
    );
  }
  render() {
    const { machine } = this.props;
    return (
      <View style={[styles.container, { maxWidth: 100 }]}>
        <Icon
          name="gamepad"
          size={20}
          color="white"
          style={styles.icon}
        />
        {(machine && machine.views) ? this.renderDisplay(machine.views) : this.renderLoading()}
        {(machine && machine.members) ? this.renderMemberList(machine.members) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    string: state.preference.language.string,
    machine: state.game.machine,
  };
}

export default connect(mapStateToProps, null)(Viewers);
