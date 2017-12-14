import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchMode } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class SwitchCameraButton extends Component {
	render(){
		const { string , switchMode } = this.props;
		return (
			<Button
				textStyle={{
					color : 'white',
					fontSize : 20,
					fontFamily : 'Silom',
					fontWeight : 'bold'
				}}
				btnStyle={{
					backgroundColor : '#D10B9D',
					paddingVertical : 20,
					paddingHorizontal : 20
				}}
				borderColor={'#890E6F'}
				icon={{ name : 'camera' , size : 20 , color : 'white' }}
				onPressFunction={()=>switchMode()}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		switchMode
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SwitchCameraButton)
