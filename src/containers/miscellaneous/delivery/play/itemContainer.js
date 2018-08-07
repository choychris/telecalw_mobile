import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import emoji from 'node-emoji';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formatTimeStamp } from '../../../../utils/format';
import { selectPrize, unselectPrize, exchange } from '../../actions';


const ticket = require('../../../../../assets/utilities/ticket.png');

class PlayItem extends Component {
  constructor() {
    super();
    this.toggleSelect = this.toggleSelect.bind(this);
    this.getTickets = this.getTickets.bind(this);
  }
  getTickets(name, ticketPrice) {
    const { id, navigator } = this.props;
    Alert.alert(
      `Get Tickets ${emoji.get('ticket')}`,
      `Want to exhcnage "${name}" for ${ticketPrice * 0.9} tickets ${emoji.get('question')}`,
      [
        {
          text: `No ${emoji.get('heavy_multiplication_x')}`,
          style: 'cancel',
        },
        {
          text: `Yes ${emoji.get('heavy_check_mark')}`,
          onPress: () => {
            this.props.exchange(navigator, id);
          },
        },
      ],
    );
  }
  toggleSelect() {
    const { selected, id } = this.props;
    if (!selected) {
      this.props.selectPrize(id);
    } else {
      this.props.unselectPrize(id);
    }
  }
  render() {
    const {
      product,
      expires,
      locale,
      selected,
    } = this.props;
    const { name, images, ticketPrice } = product;
    const productName = name[locale] || name.en;
    const image = (images.icon === '') ? images.thumbnail : images.icon;
    const icon = selected ? 'check-circle-outline' : 'circle-outline';
    return (
      <View
        style={styles.container}
      >
        <View style={styles.productView}>
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMode="contain"
          />
          <Text style={styles.text}>
            {productName}
          </Text>
        </View>
        <View style={styles.infoView}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={this.toggleSelect}
          >
            <Text style={[styles.btnText, { color: 'white' }]}>
              Select
            </Text>
            <Icon name={icon} size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => { this.getTickets(productName, ticketPrice); }}
          >
            <Icon name="swap-horizontal" size={20} color="#30D64A" />
            <Image
              source={ticket}
              style={styles.ticketImage}
            />
            <Text style={styles.btnText}>
              { ticketPrice * 0.9 }
            </Text>
          </TouchableOpacity>
          <Text style={[styles.text, { alignSelf: 'flex-start' }]}>
            Expires: {formatTimeStamp(expires)}
          </Text>
        </View>
      </View>
    );
  }
}

const fontFamily = (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
    marginHorizontal: 10,
  },
  productView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoView: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    fontFamily,
    color: '#30D64A',
    fontSize: 16,
    marginVertical: 2,
    textAlign: 'right',
  },
  btnText: {
    fontFamily,
    color: '#30D64A',
    fontSize: 20,
    textAlign: 'right',
    marginHorizontal: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
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

function mapStateToProps(state) {
  return {
    locale: state.preference.language.locale,
    play: state.mis.play,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPrize,
    unselectPrize,
    exchange,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayItem);
