import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formatTimeStamp } from '../../../../utils/format';
import { selectPrize, unselectPrize } from '../../actions';

const ticket = require('../../../../../assets/utilities/ticket.png');

class PlayItem extends Component {
  constructor() {
    super();
    this.toggleSelect = this.toggleSelect.bind(this);
  }
  onItemPress() {
    this._selectedAction(selected, id, product.id);
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
    const icon = selected ? 'check-circle-outline' : 'circle-outline';
    return (
      <View
        style={styles.container}
      >
        <View style={styles.productView}>
          <Image
            style={styles.image}
            source={(images && images.thumbnail) ? { uri: images.thumbnail } : null}
            resizeMode="contain"
          />
          <Text style={styles.text}>
            {name[locale] || name.en}
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
          <TouchableOpacity style={styles.btnStyle}>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayItem);
