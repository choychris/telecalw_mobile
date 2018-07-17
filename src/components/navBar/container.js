import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Coins from './coins';
import Signal from './signal';
import Location from '../../containers/game/gamePlayList/location/name';
import Back from './back';
import Viewers from './viewers';
import Timer from './timer';

const DeviceInfo = require('react-native-device-info');

class NavBar extends Component {
  shouldComponentUpdate(nextProps) {
    const { token } = this.props;
    return nextProps.token !== token;
  }
  render() {
    const {
      back,
      coins,
      location,
      signal,
      timer,
      viewers,
      navigator,
      coinsDisable,
      token,
    } = this.props;
    const spaceStyle = (timer === true) ? { justifyContent: 'space-between' } : null;
    return (
      <View style={[styles.container, spaceStyle]}>
        {(back === true) ? <Back navigator={navigator} /> : null }
        {(coins === true && token.lbToken !== undefined) ?
          <Coins navigator={navigator} disabled={coinsDisable} /> : null}
        {(timer === true) ? <Timer /> : null}
        {(location === true) ? <Location /> : null}
        {(viewers === true && token.lbToken !== undefined) ? <Viewers /> : null}
        {(signal === true) ? <Signal navigator={navigator} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: (DeviceInfo.getModel() === 'iPhone X') ? 35 : 5,
    paddingBottom: 5,
  },
});

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, null)(NavBar);

