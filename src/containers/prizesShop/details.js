import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      buy,
      closeDetails,
    } = this.props;
    const { pic } = this.state;
    const uri = (pic !== null) ? images.product[pic] : images.icon;
    const imageArray = images.product.filter(item => item !== '');
    return (
      <View
        style={[
          styles.container,
          {
            transform: [
              { translateY: -100 },
              { translateX: 500 },
            ],
          },
        ]}
      >
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
        <View style={{ flexDirection: 'row', marginBottom: 10, }}>
          { this.renderImageList(images.icon, null) }
          {
            imageArray.map((src, i) => this.renderImageList(src, i))
          }
        </View>
        <Text style={styles.textStyle}>
          Description:
        </Text>
        <Text style={styles.textStyle}>
          { description.en }
        </Text>
        <Text style={styles.textStyle}>
          Stocks: { sku }
        </Text>
        <View style={{ alignItems: 'center', margin: 10 }}>
          <Text style={styles.textStyle}>
            { `Get ${name.en} with ${ticketPrice} tickets` }
          </Text>
          <TouchableOpacity
            style={styles.btnStyle}
            // disabled={outOfStock}
            onPress={() => { buy(id, name.en, ticketPrice); }}
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
      </View>
    );
  }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: (width - 50),
    alignSelf: 'center',
    backgroundColor: 'rgba(37, 47, 100, 0.6)',
    borderRadius: 5,
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
    fontSize: 12,
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
