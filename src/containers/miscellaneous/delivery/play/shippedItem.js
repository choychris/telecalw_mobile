import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Strings from '../../i18n';

const ShippedItem = ({
  locale, product, nextState, status,
}) =>
  <View style={styles.container}>
    <Image
      source={{ uri: product.images.thumbnail }}
      style={styles.imageStyle}
    />
    <Text style={styles.text}>
      {product.name[locale]}
    </Text>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
    }}
    >
      <TouchableOpacity
        onPress={nextState}
        style={styles.btnStyle}
      >
        <Text style={styles.text}>
          {Strings(locale, 'details')}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.text, { textAlign: 'right' }]}>
        {`${Strings(locale, 'status')}:\n${Strings(locale, status)}`}
      </Text>
    </View>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
  text: {
    fontFamily: 'PixelOperator-Bold',
    color: '#30D64A',
    fontSize: 20,
    marginVertical: 2,
    textAlign: 'right',
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30D64A',
    borderRadius: 4,
    marginVertical: 5,
    padding: 5,
  },
});

export default ShippedItem;
