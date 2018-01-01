import React, { PropTypes, Component } from 'react';
import { View , TextInput , StyleSheet , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class PhoneForm extends Component {
	render(){
		const { 
			string , 
			dispatchFunction,
			value
		} = this.props;
		//console.warn(value);
		return (
			<View>
				<View style={styles.header}>
					<Icon name="phone" size={25} />
					<Text style={styles.headerText}>{string['phone']}</Text>
				</View>
				<TextInput
					style={styles.input}
					placeholder={string['inputPhone']}
					keyboardType={'numeric'}
					value={(value) ? String(value) : ''}
					onChangeText={(text)=>dispatchFunction('PHONE',Number(text))}
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
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(PhoneForm)
