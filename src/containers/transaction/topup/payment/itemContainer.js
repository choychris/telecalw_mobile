import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectRate } from '../../actions';


const single = require('../../../../../assets/utilities/coins/telecoins_single.png');
const multi = require('../../../../../assets/utilities/coins/telecoins_multi.png');
const many = require('../../../../../assets/utilities/coins/telecoins_many.png');

const { width } = Dimensions.get('window');

class RateItem extends Component {
  shouldComponentUpdate(nextProps) {
    const { rate } = this.props;
    return JSON.stringify(rate) !== JSON.stringify(nextProps.rate);
  }
  render() {
    const {
      coins,
      rate,
      id,
      bonus,
      string,
      currency,
      // userCurrency,
    } = this.props;
    let rateImg = single;
    if (coins > 300) rateImg = multi;
    if (coins >= 1000) rateImg = many;
    const selected = (rate === id) ? styles.selectedBorder : null;
    // console.warn(rate);
    // console.warn(id);
    return (
      <TouchableOpacity
        style={[styles.container, selected]}
        onPress={() => this.props.selectRate(id)}
      >
        <Image
          source={rateImg}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.text}>
            {`${coins} ${string.coins}`}
          </Text>
          <Text style={[styles.text, { fontSize: 18 }]}>
            {`${bonus} ${string.bonus}`}
          </Text>
          <Text style={styles.text}>
            {`${currency.hkd} HKD`}
          </Text>
          <Text style={styles.text}>
            {`(~${currency.usd} USD)`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    width: (width / 2) - 35,
    padding: 10,
    margin: 5,
  },
  text: {
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    color: '#30D64A',
    fontSize: 16,
    marginVertical: 2,
  },
  image: {
    width: 30,
    height: 60,
    marginRight: 10,
  },
  selectedBorder: {
    borderColor: '#CF333F',
    borderWidth: 5,
  },
});

function mapStateToProps(state) {
  return {
    rate: state.transaction.rate,
    string: state.preference.language.string,
    userCurrency: state.preference.currency,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectRate,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RateItem);
