import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchMode } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class SwitchCameraButton extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { 
			string , 
			switchMode ,
			cameras
		} = this.props;
		return (cameras.length > 1) ?  (
			<Button
				btnStyle={{
					backgroundColor : '#D10B9D',
					paddingVertical : 15,
					paddingHorizontal : 15,
					right : 40,
					bottom : 10
				}}
				borderColor={'#890E6F'}
				icon={{ name : 'eye' , size : 20 , color : 'white' }}
				onPressFunction={()=>switchMode()}
			/>
		) : null;
	}
}

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		cameras : state.game.machine.cameras
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		switchMode
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SwitchCameraButton)
