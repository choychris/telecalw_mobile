import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { transactions } from '../../actions';
import TransactionItem from './itemContainer';

const { height } = Dimensions.get('window');

class TransactionListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }
  componentDidMount() {
    // Fetch Remote Backend API to Get List of Transactions
    const { transactions, navigator } = this.props;
    transactions(navigator);
  }
  shouldComponentUpdate(nextProps) {
    const { transactionsData } = this.props;
    return (transactionsData !== nextProps.transactionsData);
  }
  render() {
    const { transactionsData, string } = this.props;
    if (!transactionsData) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="green" />
        </View>
      );
    }
    if (transactionsData.length > 0) {
      const { ds } = this.state;
      const dataSource = ds.cloneWithRows(transactionsData);
      return (
        <View style={styles.container}>
          <ListView
            contentContainerStyle={styles.listContainer}
            dataSource={dataSource}
            renderRow={rowData => <TransactionItem {...rowData} />}
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
    marginVertical: 10,
    height: height * 0.4,
  },
  listContainer: {
    alignSelf: 'stretch',
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
    transactionsData: state.transaction.transactions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    transactions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListContainer);
