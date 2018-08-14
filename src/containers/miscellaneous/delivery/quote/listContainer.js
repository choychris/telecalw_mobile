import React, { Component } from 'react';
import { ListView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuoteItem from './itemContainer';

// const height = Dimensions.get('window').height;

class QuoteSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { quotes } = this.props;
    if (quotes.length > 0) {
      const { ds } = this.state;
      const dataSource = Array.isArray(quotes) ?
        ds.cloneWithRows(quotes) :
        ds.cloneWithRows([quotes]);
      return (
        <View style={styles.container}>
          <ListView
            dataSource={dataSource}
            renderRow={rowData => <QuoteItem {...rowData} />}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="black" />
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
  },
});

function mapStateToProps(state) {
  return {
    quotes: state.mis.logistic.quotes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteSelect);
