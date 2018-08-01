import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddressForm from './form/address';
import PhoneForm from './form/phone';
import TargetForm from './form/target';
import { fillLogisticForm, changeLogisticTarget } from '../../actions';

const { height } = Dimensions.get('window');

class LogisticForm extends Component {
  shouldComponentUpdate(nextProps) {
    const { logistic, user } = this.props;
    return JSON.stringify(logistic) !== JSON.stringify(nextProps.logistic) ||
      JSON.stringify(user) !== JSON.stringify(nextProps.user);
  }
  render() {
    const {
      fillLogisticForm,
      changeLogisticTarget,
      logistic,
    } = this.props;
    const { target } = logistic;
    // console.warn(JSON.stringify(logistic));
    // console.warn(JSON.stringify(user));
    return (
      <ScrollView style={styles.form}>
        <TargetForm
          dispatchFunction={changeLogisticTarget}
        />
        <AddressForm
          dispatchFunction={fillLogisticForm}
          value={(this.props[target].address) ? this.props[target].address : {}}
        />
        <PhoneForm
          dispatchFunction={fillLogisticForm}
          value={(this.props[target].address) ? this.props[target].address.phone : ''}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    // height: height * 0.4,
    flex: 5,
    backgroundColor: 'transparent',
    marginVertical: 5,
    alignSelf: 'stretch',
  },
});

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    logistic: state.mis.logistic,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fillLogisticForm,
    changeLogisticTarget,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogisticForm);
