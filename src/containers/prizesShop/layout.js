import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../components/utilities/backgroundImage';
import StarsImage from '../../components/utilities/starsImage';
import NavBar from '../../components/navBar/container';
import PrizeList from './listContainer';
import { getPrizeList } from './actions';

class PrizeShop extends Component {
  constructor() {
    super();
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.props.getPrizeList();
  }
  render() {
    const { prizes, navigator } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage type="random" />
        <StarsImage />
        <NavBar
          back
          coins
          navigator={navigator}
        />
        <PrizeList prizes={prizes} />
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

const mapStateToProps = state => ({
  prizes: state.center.prizes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPrizeList,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrizeShop);
