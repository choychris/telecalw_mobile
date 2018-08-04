import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ticket = require('../../../assets/utilities/ticket.png');

class PrizeItem extends Component {
  exchange(productName, ticketPrice) {
    const { getPrize } = this.props;
  }
  render() {
    const {
      images, name, sku, ticketPrice,
    } = this.props;
    return (
      <View style={styles.conatiner}>
        <Image
          source={{ uri: images.icon }}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>
          { name.en }
        </Text>
        <Text style={styles.textStyle}>
          Stock: { sku }
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.btnStyle}
          >
            <Text style={styles.textStyle}>
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => { this.exchange(name.en, ticketPrice); }}
          >
            <Icon name="swap-horizontal" size={20} color="#30D64A" />
            <Image
              source={ticket}
              style={styles.ticketImage}
            />
            <Text style={styles.btnText}>
              { ticketPrice }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  btnText: {
    fontFamily: 'PixelOperator-Bold',
    color: '#30D64A',
    fontSize: 20,
    textAlign: 'right',
    marginHorizontal: 2,
  },
  ticketImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 2,
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#30D64A',
    borderRadius: 4,
    marginVertical: 8,
    padding: 2,
  },
});

export default PrizeItem;
