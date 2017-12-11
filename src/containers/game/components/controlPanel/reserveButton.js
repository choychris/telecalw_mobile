import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class ReserveButton extends Component {
	render(){
		const { string , machine } = this.props;
		const displayString = `${machine.reservation} ${string['reserve']}`;
		return (
			<Button
				text={displayString}
				textStyle={{
					color : 'white',
					fontSize : 20,
					fontFamily : 'Silom',
					fontWeight : 'bold'
				}}
				btnStyle={{
					backgroundColor : '#FF9700',
					paddingVertical : 16,
					paddingHorizontal : 10
				}}
				borderColor={'#BC6B00'}
				icon={{ name : 'users' , size : 15 , color : 'white' }}
				onPressFunction={()=>{}}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps,null)(ReserveButton)
