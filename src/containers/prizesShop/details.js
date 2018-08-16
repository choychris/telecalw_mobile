import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Strings from '../miscellaneous/i18n';

const { width, height } = Dimensions.get('window');
const ticket = require('../../../assets/utilities/ticket.png');

class PrizeDetails extends Component {
  constructor() {
    super();
    this.state = {
      pic: null,
    };
    this.renderImageList = this.renderImageList.bind(this);
  }
  renderImageList(uri, index) {
    return (
      <TouchableOpacity
        key={uri}
        onPress={() => {
          this.setState({ pic: index });
        }}
      >
        <Image
          source={{ uri }}
          style={styles.imageList}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const {
      id,
      images,
      name,
      sku,
      ticketPrice,
      description,
      size,
      weight,
      buy,
      closeDetails,
      locale,
      translateX,
    } = this.props;
    const { pic } = this.state;
    const outOfStock = (sku <= 0);
    const OOSStyle = outOfStock ? { opacity: 0.5, textDecorationLine: 'line-through' } : null;
    const OOSBtn = outOfStock ? { opacity: 0.5 } : null;
    const uri = (pic !== null) ? images.product[pic] : images.icon;
    const imageArray = images.product.filter(item => item !== '');
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX }] },
        ]}
      >
        <ScrollView>
          <Icon
            name="close"
            size={36}
            color="white"
            style={styles.iconStyle}
            onPress={closeDetails}
          />
          <Image
            source={{ uri }}
            style={styles.thumbnail}
          />
          <View style={{ flexDirection: 'row', marginBottom: 5, opacity: 0.8 }}>
            { this.renderImageList(images.icon, null) }
            {
              imageArray.map((src, i) => this.renderImageList(src, i))
            }
          </View>
          <View style={{ margin: 5 }}>
            <Text style={styles.textStyle}>
              {Strings(locale, 'desc')}
            </Text>
            <Text style={styles.textStyle}>
              { description[locale] }
            </Text>
            <Text style={styles.textStyle}>
              Size: {size.width}x{size.height}x{size.length} cm / Weight: {weight.value} kg
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
          </View>
          <View style={{ alignItems: 'center', margin: 10 }}>
            <Text style={styles.textStyle}>
              { `Get ${name[locale]} with ${ticketPrice} tickets` }
            </Text>
            <TouchableOpacity
              style={[styles.btnStyle, OOSBtn]}
              disabled={outOfStock}
              onPress={() => { buy(id, name[locale], ticketPrice); }}
            >
              <Icon name="swap-horizontal" size={24} color="#30D64A" />
              <Image
                source={ticket}
                style={styles.ticketImage}
              />
              <Text style={styles.btnText}>
                { ticketPrice }
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: (width - 50),
    height: (height * 0.85),
    bottom: (height / 20),
    alignSelf: 'center',
    backgroundColor: 'rgba(37, 47, 100, 0.6)',
    borderRadius: 5,
    zIndex: 3,
    flex: 1,
    // borderBottomRightRadius: 5,
  },
  iconStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    zIndex: 3,
  },
  thumbnail: {
    width: (width - 50),
    height: (width - 50),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imageList: {
    width: (width - 50) / 4,
    height: (width - 50) / 4,
    resizeMode: 'contain',
  },
  textStyle: {
    color: 'white',
    fontFamily: 'PixelOperator8-Bold',
    fontSize: 10,
    margin: 3,
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
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#30D64A',
    borderRadius: 4,
    marginVertical: 8,
    padding: 2,
  },
});

export default PrizeDetails;
