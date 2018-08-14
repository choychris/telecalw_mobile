import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Strings from '../../../i18n';

class TargetForm extends Component {
  shouldComponentUpdate(nextProps) {
    const { target } = this.props;
    return target !== nextProps.target;
  }
  render() {
    const {
      locale,
      target,
      dispatchFunction,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {Strings(locale, 'others')}
        </Text>
        <Switch
          value={(target === 'user')}
          onValueChange={(value) => {
            const updateTarget = (value === true) ? 'user' : 'logistic';
            // console.warn(updateTarget);
            dispatchFunction(updateTarget);
          }}
        />
        <Text style={styles.text}>
          {Strings(locale, 'myself')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  text: {
    paddingHorizontal: 10,
    fontFamily: 'Silom',
    fontSize: 18,
  },
});

function mapStateToProps(state) {
  return {
    locale: state.preference.language.locale,
    target: state.mis.logistic.target,
  };
}

export default connect(mapStateToProps, null)(TargetForm);
