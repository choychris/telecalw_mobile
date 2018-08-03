import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const coinsImg = require('../../../../../assets/utilities/coins/telecoins_single.png');

class Receipt extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.delivery.id !== undefined;
  }
  _renderLoading() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }
  _renderDisplayAddress(address) {
    let displayAddress = '';
    displayAddress += Object.keys(address).map(key => address[key]);
    return displayAddress;
  }
  render() {
    const { delivery, string } = this.props;
    const { tracking, address, cost } = delivery;
    // console.warn(JSON.stringify(delivery));
    return (delivery.id) ? (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="map-marker" size={20} />
          <Text style={styles.headerText}>
            {string.address}
          </Text>
        </View>
        <Text style={styles.address}>
          {this._renderDisplayAddress(address)}
        </Text>
        <View style={styles.header}>
          <Icon name="money" size={20} />
          <Text style={styles.headerText}>
            {string.cost}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.address}>
            {cost}
          </Text>
          <Image
            source={coinsImg}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    ) : this._renderLoading();
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginVertical: 5,
    flex: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    margin: 5,
    fontSize: 20,
  },
  address: {
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    padding: 8,
    fontSize: 15,
    backgroundColor: 'white',
  },
  rightContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 20,
    height: 20,
  },
});

function mapStateToProps(state) {
  return {
    string: state.preference.language.string,
    delivery: state.mis.delivery,
  };
}

export default connect(mapStateToProps)(Receipt);
