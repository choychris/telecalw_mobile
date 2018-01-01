import React, { PropTypes, Component } from 'react';
import { View , TextInput , StyleSheet , Picker , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
var countries = require('country-list')();
var DeviceInfo = require('react-native-device-info');

class AddressForm extends Component {
	componentDidMount(){
		const { value , dispatchFunction } = this.props;
		if(!value.countryCode) dispatchFunction('COUNTRY_CODE',DeviceInfo.getDeviceCountry().toLowerCase());
	}
	_renderCountryPicker(){
		const { value , dispatchFunction } = this.props;
		const countriesList = countries.getCodeList();
		return(
			<Picker
				itemStyle={styles.pickerItem}
				onValueChange={(value)=>dispatchFunction('COUNTRY_CODE',value)}
				selectedValue={(value.countryCode)}
			>
				{Object.keys(countriesList).map((countryCode)=><Picker.Item key={countryCode} label={countriesList[countryCode]} value={countryCode} />)}
			</Picker>
		)
	}
	render(){
		const { 
			string , 
			dispatchFunction , 
			value
		} = this.props;
		return (
			<View>
				<View style={styles.header}>
					<Icon name="rocket" size={20}/>
					<Text style={styles.headerText}>{string['address']}</Text>
				</View>
				{this._renderCountryPicker()}
				<TextInput
					style={styles.input}
					value={(value.address) ? value.address : ''}
					placeholder={string['inputAddress']}
					onChangeText={(text)=>dispatchFunction('ADDRESS',text)}
				/>
				<TextInput
					style={styles.input}
					placeholder={string['inputPostalCode']}
					value={(value.postalCode) ? value.postalCode : ''}
					onChangeText={(text)=>dispatchFunction('POSTAL_CODE',text)}
				/>
			</View>	
		)
	}
}

const styles = StyleSheet.create({
	header : {
		flexDirection : 'row',
		alignItems : 'center',
		paddingHorizontal : 10
	},
	headerText : {
		marginHorizontal : 5,
		fontSize : 15,
		fontWeight : 'bold'
	},
	input : {
		backgroundColor : 'white',
		height: 35,
		marginTop : 5,
		marginBottom : 10,
		paddingHorizontal : 10,
		fontSize : 13
	},
	pickerItem : { 
		height: 50 , 
		color : '#008CFF', 
		fontSize : 15 
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(AddressForm);
