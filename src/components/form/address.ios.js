import React, { PropTypes, Component } from 'react';
import { View , TextInput , StyleSheet , Picker , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
var countries = require('country-list')();

class AddressForm extends Component {
	_renderCountryPicker(){
		const { user , dispatchFunction , action } = this.props;
		const countriesList = countries.getCodeList();
		return(
			<Picker
				itemStyle={styles.pickerItem}
				onValueChange={(value)=>dispatchFunction(action.countryCode,value)}
				selectedValue={(user.countryCode) ? user.countryCode : 'us'}
			>
				{Object.keys(countriesList).map((countryCode)=><Picker.Item key={countryCode} label={countriesList[countryCode]} value={countryCode} />)}
			</Picker>
		)
	}
	render(){
		const { string , dispatchFunction , action } = this.props;
		return (
			<View>
				<View style={styles.header}>
					<Icon name="rocket" size={30}/>
					<Text style={styles.headerText}>{string['address']}</Text>
				</View>
				{this._renderCountryPicker()}
				<TextInput
					style={styles.input}
					placeholder={string['inputAddress']}
					onChangeText={(text)=>dispatchFunction(action.address,text)}
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
	},
	pickerItem : { 
		height: 50 , 
		color : '#008CFF', 
		fontSize : 15 
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		user : state.auth.user
	}
}

export default connect(mapStateToProps,null)(AddressForm);
