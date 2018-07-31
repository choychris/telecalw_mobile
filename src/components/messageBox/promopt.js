import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Prompt extends Component {
  shouldComponentUpdate(nextProps) {
    const { language } = this.props;
    return language.locale !== nextProps.language.locale;
  }
  render() {
    const { language, promptString } = this.props;
    const { string } = language;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {string[promptString]}
        </Text>
      </View>
    );
  }
}

// const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  text: {
    color: '#30D64A',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    fontSize: 15,
  },
});

function mapStateToProps(state) {
  return {
    language: state.preference.language,
  };
}

export default connect(mapStateToProps, null)(Prompt);

