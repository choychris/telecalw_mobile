import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ticket = require('../../../assets/utilities/ticket.png');

const PrizeItem = ({
  id, images, name, sku, ticketPrice, buy, showDetails,
}) => {
  const outOfStock = (sku <= 0);
  const OOSStyle = outOfStock ? { opacity: 0.5, textDecorationLine: 'line-through' } : null;
  const OOSBtn = outOfStock ? { opacity: 0.5 } : null;
  return (
    <View style={styles.conatiner}>
      <Image
        source={{ uri: images.icon }}
        style={styles.imageStyle}
      />
      <Text style={styles.textStyle}>
        { name.en }
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.textStyle, OOSStyle]}>
          Stock: { sku }
        </Text>
        {
          outOfStock ?
            <Text style={[styles.textStyle, { color: '#FF8360' }]}>
              Out Of Stock
            </Text> : null
        }
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={showDetails}
        >
          <Text style={styles.btnText}>
            {'Prize\nDetails'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnStyle, OOSBtn]}
          disabled={outOfStock}
          onPress={() => { buy(id, name.en, ticketPrice); }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="swap-horizontal" size={24} color="#30D64A" />
            <Image
              source={ticket}
              style={styles.ticketImage}
            />
          </View>
          <Text style={styles.btnText}>
            { ticketPrice }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  conatiner: {
    margin: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 47, 100, 0.5)',
    borderRadius: 10,
    minWidth: (width - 40) / 2,
    padding: 8,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    marginVertical: 8,
  },
  imageStyle: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  textStyle: {
    fontFamily: 'PixelOperator-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  btnText: {
    fontFamily: 'PixelOperator-Bold',
    color: '#30D64A',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  ticketImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 2,
  },
  btnStyle: {
    // flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30D64A',
    borderRadius: 4,
    padding: 2,
  },
});

export default PrizeItem;
