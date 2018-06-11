import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import DetailsButton from '../components/homePage/detailsButton';
import NavButtonGroup from '../components/homePage/navigate/buttonGroup';
import ItemButtonGroup from '../components/homePage/items/itemButtonGroup';
import DetialSwiper from '../components/homePage/detailSwiper';
import Config from '../utils/config';

const titleImage = require('../images/titleImage.png');

const { deviceWidth } = Config;

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      detailOpened: false,
    };
    this.onDetailsPress = this.onDetailsPress.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);
  }

  onDetailsPress() {
    this.setState({ detailOpened: true });
  }

  onDetailClose() {
    this.setState({ detailOpened: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={{ flex: 0.3 }}>Back Button</View>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={titleImage} />
        </View>
        <DetailsButton onPress={this.onDetailsPress} />
        <NavButtonGroup />
        <ItemButtonGroup />
        { this.state.detailOpened ?
          <DetialSwiper onPress={this.onDetailClose} /> : null }
      </View>
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
