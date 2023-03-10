import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import Signal from './signal';

const coinImage = require('../../../../../../assets/utilities/coins/telecoins_single.png');

class ProductInfo extends Component {
  shouldComponentUpdate(nextProps) {
    const { name, status, locale } = this.props;
    return name !== nextProps.name || status !== nextProps.status || locale !== nextProps.locale;
  }
  productName() {
    const { locale, name } = this.props;
    return (name[locale]) ? name[locale] : name.en;
  }
  render() {
    const {
      onPressFunction,
      status,
      gamePlayRate,
      id,
    } = this.props;
    const { maintainStatus } = status;
    return (
      <TouchableOpacity
        onPress={() => onPressFunction(id, status.maintainStatus)}
        disabled={maintainStatus}
      >
        <View style={styles.row}>
          <Signal {...status} />
          <Text style={styles.text}>
            {this.productName()}
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={coinImage}
            resizeMode="contain"
          />
          <Text style={styles.text}>
            {gamePlayRate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'white',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 18,
    height: 18,
    marginHorizontal: 5,
  },
});

function mapStateToProps(state) {
  return {
    locale: state.preference.language.locale,
  };
}

export default connect(mapStateToProps, null)(ProductInfo);
