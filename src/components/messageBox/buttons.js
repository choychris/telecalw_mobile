import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../utilities/buttons';

const Buttons = ({ buttons }) =>
  <View style={styles.container}>
    {buttons.map(button =>
      <Button
        key={Math.random()}
        {...button}
      />)}
  </View>;


const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(null, null)(Buttons);
