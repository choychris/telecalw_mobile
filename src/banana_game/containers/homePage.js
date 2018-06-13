import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, Animated } from 'react-native';
import DetailsButton from '../components/homePage/detailsButton';
import NavButtonGroup from '../components/homePage/navigate/buttonGroup';
import ItemButtonGroup from '../components/homePage/items/itemButtonGroup';
import DetialSwiper from '../components/homePage/detailSwiper';
import BackButton from '../../components/navBar/container';
import Config from '../utils/config';

const titleImage = require('../images/titleImage.png');

const { deviceWidth } = Config;

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      detailOpened: false,
    };
    this.animateValue = new Animated.Value(0);
    this.onDetailsPress = this.onDetailsPress.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);
  }

  componentDidMount() {
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      },
    ).start();
  }

  onDetailsPress() {
    this.setState({ detailOpened: true });
  }

  onDetailClose() {
    this.setState({ detailOpened: false });
  }

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.animateValue }]}>
        <StatusBar hidden />
        <BackButton back coins navigator={this.props.navigator} />
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={titleImage} />
        </View>
        <DetailsButton onPress={this.onDetailsPress} />
        <NavButtonGroup />
        <ItemButtonGroup />
        { this.state.detailOpened ?
          <DetialSwiper onPress={this.onDetailClose} /> : null }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.3,
  },
  imageStyle: {
    alignSelf: 'flex-start',
    width: deviceWidth,
    height: 50,
    resizeMode: 'contain',
  },
});

export default HomePage;
