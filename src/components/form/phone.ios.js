import React, { PropTypes, Component } from 'react';
import { View , TextInput , StyleSheet , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class PhoneForm extends Component {
	render(){
		const { string , dispatchFunction , action } = this.props;
		return (
			<View>
				<View style={styles.header}>
					<Icon name="phone" size={35} />
					<Text style={styles.headerText}>{string['phone']}</Text>
				</View>
				<TextInput
					style={styles.input}
					placeholder={string['inputPhone']}
					keyboardType={'numeric'}
					onChangeText={(text)=>dispatchFunction(action,Number(text))}
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

export default connect(mapStateToProps,null)(PhoneForm)
