import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { loading } from '../../utilities/actions';
import { loadGameList, networkChecking, productStatus, reserveStatus, getCheckinReward } from '../actions';
import { playBackgroundMusic } from '../../../utils/sound';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import StarsImage from '../../../components/utilities/starsImage';
import NavBar from '../../../components/navBar/container';
import LocationBar from './location/bar';
import ListContainer from './gameList/listContainer';
import BarContainer from './bottomBar/barContainer';
import { trackScreen } from '../../../utils/analytic';

class GamePlayList extends Component {
  componentWillMount() {
    this.props.trackScreen('GamePlayList');
  }
  componentDidMount() {
    const {
      navigator,
      loadGameList,
      networkChecking,
      productStatus,
      reserveStatus,
    } = this.props;
    // Initial Function of Game Play List
    loadGameList(navigator);
    // Initial Netwrok Checking Listener
    networkChecking(navigator);
    // Initiate Pusher Product Status Listener
    productStatus();
    // Initiate Pusher Reservation Listener
    reserveStatus(navigator);
    // Play Background Music
    this.startBackground();
  }

  shouldComponentUpdate(nextProps) {
    const { sound } = this.props;
    return nextProps.sound !== sound;
  }

  componentDidUpdate() {
    const { sound } = this.props;
    if (sound === false) this.stopBackground();
    if (sound === true) this.startBackground();
  }

  componentWillUnmount() {
    this.stopBackground();
  }

  startBackground() {
    this.background = this.props.playBackgroundMusic();
  }
  stopBackground() {
    if (this.background) this.background.stop(() => this.background.release());
  }
  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage type="random" />
        <StarsImage />
        <NavBar
          coins
          location
          signal
          navigator={navigator}
        />
        <LocationBar />
        <ListContainer navigator={navigator} />
        <BarContainer navigator={navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    sound: state.preference.preference.sound,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadGameList,
    networkChecking,
    productStatus,
    reserveStatus,
    getCheckinReward,
    playBackgroundMusic,
    trackScreen,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayList);
