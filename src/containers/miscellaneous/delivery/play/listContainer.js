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

class GamePlaySelect extends Component {
  componentDidMount() {
    const { winResult, navigator } = this.props;
    // Fetch Play Result from Backend
    winResult(navigator);
  }
  shouldComponentUpdate(nextProps) {
    const { prizes } = this.props;
    return prizes !== nextProps.prizes;
  }
  componentWillUnmount() {
    this.props.clearPrizes();
  }
  render() {
    const { prizes, string } = this.props;
    if (!prizes) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="black" />
        </View>
      );
    }
    if (prizes.length > 0) {
      const { nextState } = this.props;

      return (
        <View style={styles.container}>
          <FlatList
            data={prizes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PrizeItem
                product={item.product}
                expires={item.expires}
                nextState={nextState}
              />
            )}
          />
        </View>
      );
    }
    return (
      <View style={[styles.container]}>
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
    marginVertical: 10,
    flex: 5,
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
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
  },
});

function mapStateToProps(state) {
  return {
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
