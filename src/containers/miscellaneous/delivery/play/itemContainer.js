import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formatTimeStamp } from '../../../../utils/format';
import { selectPlay, unselectPlay } from '../../actions';

const ticket = require('../../../../../assets/utilities/ticket.png');

const { width } = Dimensions.get('window');

class PlayItem extends Component {
  _checkSelected(play, id) {
    let selected = false;
    play.map(item => ((item.playId === id) ? selected = true : null));
    return selected;
  }
  _selectedAction(selected, id, productId) {
    const { selectPlay, unselectPlay } = this.props;
    (selected) ? unselectPlay(id) : selectPlay(id, productId);
  }
  onItemPress() {
    this._selectedAction(selected, id, product.id);
  }

  render() {
    const {
      product,
      expires,
      locale,
    } = this.props;
    const { name, images, ticketPrice } = product;
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
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.btnText}>
              Select
            </Text>
            <Icon name="circle-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle}>
            <Icon name="swap-horizontal" size={20} color="white" />
            <Image
              source={ticket}
              style={styles.ticketImage}
            />
            <Text style={styles.btnText}>
              { ticketPrice * 0.9 }
            </Text>
          </TouchableOpacity>
          <Text style={styles.text}>
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
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
    marginHorizontal: 2,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  ticketImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
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
    selectPlay,
    unselectPlay,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayItem);
