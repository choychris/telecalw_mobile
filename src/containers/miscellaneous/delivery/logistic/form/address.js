import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const countries = require('country-list')();

class AddressForm extends Component {
  shouldComponentUpdate(nextProps) {
    const { value } = this.props;
    return JSON.stringify(value) !== JSON.stringify(nextProps.value);
  }
  _renderCountryPicker() {
    const { value, dispatchFunction } = this.props;
    const countriesList = countries.getCodeList();
    return (
      <Picker
        itemStyle={styles.pickerItem}
        onValueChange={value => dispatchFunction('COUNTRY_CODE', value)}
        selectedValue={(value.countryCode || 'us')}
      >
        {Object.keys(countriesList).map(countryCode =>
          <Picker.Item
            key={countryCode}
            label={countriesList[countryCode]}
            value={countryCode}
          />)}
      </Picker>
    );
  }
  _renderStateInput() {
    const {
      string,
      dispatchFunction,
      value,
    } = this.props;
    return (
      <TextInput
        style={[
          styles.input,
          styles.innerInput,
          styles.inputBorder,
        ]}
        value={(value.state) ? value.state : ''}
        placeholder={string.inputState}
        onChangeText={text => dispatchFunction('STATE', text)}
      />
    );
  }
  render() {
    const {
      string,
      dispatchFunction,
      value,
    } = this.props;
    return (
      <View>
        <View style={styles.header}>
          <Icon name="rocket" size={20} />
          <Text style={styles.headerText}>{string.address}</Text>
        </View>
        {this._renderCountryPicker()}
        <View style={styles.innerContainer}>
          {(
              value.countryCode === 'us' ||
              value.countryCode === 'ca' ||
              value.countryCode === 'cn' ||
              value.countryCode === 'mx' ||
              value.countryCode === 'my' ||
              value.countryCode === 'au'
            ) ? this._renderStateInput() : null}
          <TextInput
            style={[
              styles.input,
              styles.innerInput,
              styles.inputBorder,
            ]}
            placeholder={string.inputCity}
            value={(value.city) ? value.city : ''}
            onChangeText={text => dispatchFunction('CITY', text)}
          />
          <TextInput
            style={[
              styles.input,
              styles.innerInput,
            ]}
            placeholder={string.inputPostalCode}
            value={(value.postalCode) ? value.postalCode : ''}
            onChangeText={text => dispatchFunction('POSTAL_CODE', text)}
          />
        </View>
        <TextInput
          style={styles.input}
          value={(value.line1) ? value.line1 : ''}
          placeholder={`${string.inputAddress}(line1)`}
          onChangeText={text => dispatchFunction('ADDRESS_1', text)}
        />
        <TextInput
          style={styles.input}
          value={(value.line2) ? value.line2 : ''}
          placeholder={`${string.inputAddress}(line2)`}
          onChangeText={text => dispatchFunction('ADDRESS_2', text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    marginHorizontal: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    height: 35,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  pickerItem: {
    height: 100,
    color: '#008CFF',
    fontSize: 15,
  },
  innerInput: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  inputBorder: {
    borderColor: '#EFEFEF',
    borderRightWidth: 1,
  },
});

function mapStateToProps(state) {
  return {
    string: state.preference.language.string,
  };
}

export default connect(mapStateToProps, null)(AddressForm);
