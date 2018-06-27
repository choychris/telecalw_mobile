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
  constructor(props) {
    super(props);
    this.state = {
      backgroundSound: null,
    };
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.stopBackground = this.stopBackground.bind(this);
  }

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

  // shouldComponentUpdate(nextProps) {
  //   const { sound } = this.props;
  //   return (nextProps.sound !== sound);
  // }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.sound) this.stopBackground();
    if (nextProps.sound) this.startBackground();
  }

  componentWillUnmount() {
    this.stopBackground();
  }

  onNavigatorEvent(event) {
    if (event.id === 'didAppear') {
      if (!this.state.background) {
        this.startBackground();
      }
    }
  }

  startBackground() {
    const background = this.props.playBackgroundMusic();
    this.setState({ backgroundSound: background });
  }

  stopBackground() {
    const { backgroundSound } = this.state;
    if (backgroundSound) {
      backgroundSound.stop(() => backgroundSound.release());
      this.setState({ backgroundSound: null });
    }
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
        <ListContainer navigator={navigator} stop={this.stopBackground} />
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
    game: state.game.gameId,
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
