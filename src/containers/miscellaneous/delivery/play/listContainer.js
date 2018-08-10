import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { winResult, clearPrizes } from '../../actions';
import PrizeItem from './itemContainer';
import ShippedItem from './shippedItem';

class GamePlaySelect extends Component {
  componentDidMount() {
    const { navigator, didMount } = this.props;
    // Fetch Play Result from Backend
    this.props.winResult(navigator);
    didMount();
  }
  shouldComponentUpdate(nextProps) {
    const { nextState, prizes } = this.props;
    return nextState !== nextProps.nextState || prizes !== nextProps.prizes;
  }
  componentWillUnmount() {
    this.props.clearPrizes();
  }
  render() {
    let { prizes } = this.props;
    if (!prizes) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="black" />
        </View>
      );
    }
    const {
      nextState, string, navigator, locale,
    } = this.props;
    if (nextState) {
      prizes = prizes.filter(item => item.status !== 'normal');
    } else {
      prizes = prizes.filter(item => item.status === 'normal');
    }
    const numColumns = !nextState ? 1 : 2;
    if (prizes.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            data={prizes}
            numColumns={numColumns}
            keyExtractor={item => item.id}
            key={numColumns}
            renderItem={({ item }) => {
              if (!nextState) {
                return <PrizeItem
                  id={item.id}
                  selected={item.selected}
                  product={item.product}
                  expires={item.expires}
                  navigator={navigator}
                  locale={locale}
                />;
              }
              return <ShippedItem
                product={item.product}
                status={item.status}
                locale={locale}
                nextState={() => { nextState(item.deliveryId); }}
              />;
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{string.noRecord}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginVertical: 5,
    flex: 5,
    // borderWidth: 1,
  },
  listContainer: {
    // paddingVertical: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
  },
});

function mapStateToProps(state) {
  return {
    locale: state.preference.language.locale,
    string: state.preference.language.string,
    prizes: state.mis.prizes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    winResult,
    clearPrizes,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlaySelect);
