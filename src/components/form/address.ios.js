import React, { PropTypes, Component } from 'react';
import { View , TextInput , StyleSheet , Picker , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
var countries = require('country-list')();

class AddressForm extends Component {
	_renderCountryPicker(){
		const countriesList = countries.getCodeList();
		return(
			<Picker
				itemStyle={{ height: 50 , color : '#008CFF', fontSize : 15 }}
				selectedValue={DeviceInfo.getDeviceCountry().toLowerCase()}
			>
				{Object.keys(countriesList).map((countryCode)=><Picker.Item key={countryCode} label={countriesList[countryCode]} value={countryCode} />)}
			</Picker>
		)
	}
	render(){
		const { string } = this.props;
		return (
			<View>
				<View style={styles.header}>
					<Icon name="rocket" size={30} />
					<Text style={styles.headerText}>{string['address']}</Text>
				</View>
				{this._renderCountryPicker()}
				<TextInput
					style={styles.input}
					placeholder={string['inputAddress']}
				/>
				<View style={styles.header}>
					<Icon name="phone" size={35} />
					<Text style={styles.headerText}>{string['phone']}</Text>
				</View>
				<TextInput
					style={styles.input}
					placeholder={string['inputPhone']}
					keyboardType={'numeric'}
				/>
			</View>	
		)
	}
}

const styles = StyleSheet.create({
	header : {
		flexDirection : 'row',
		alignItems : 'center',
		paddingHorizontal : 10,
		paddingVertical : 5
	},
	headerText : {
		marginHorizontal : 5,
		fontSize : 18,
		fontWeight : 'bold'
	},
	input : {
		backgroundColor : 'white',
		height: 40,
		marginTop : 5,
		marginBottom : 10,
		paddingHorizontal : 10
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(AddressForm);
