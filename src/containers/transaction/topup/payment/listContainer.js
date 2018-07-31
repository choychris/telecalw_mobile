import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { exchangeRate } from '../../actions';
import RateItem from './itemContainer';

const { height } = Dimensions.get('window');

class RateListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }
  componentDidMount() {
    // Fetch Remote Backend API to Get List of Exchage Rate
    const { navigator } = this.props;
    this.props.exchangeRate(navigator);
  }
  shouldComponentUpdate(nextProps) {
    const { version } = this.props;
    return nextProps.rates.length > 0 || version !== nextProps.version;
  }
  render() {
    const { rates } = this.props;
    if (rates.length > 0) {
      const { ds } = this.state;
      const dataSource = ds.cloneWithRows(rates);
      return (
        <View style={styles.container}>
          <ListView
            contentContainerStyle={styles.listContainer}
            dataSource={dataSource}
            renderRow={rowData => <RateItem {...rowData} />}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="green" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    height: height * 0.4,
  },
  listContainer: {
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
    rates: state.transaction.rates,
    version: state.mis.version,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    exchangeRate,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RateListContainer);
