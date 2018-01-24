import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';
import { switchMachine } from '../../actions';

class SwitchButton extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { switchMachine , navigator , machines } = this.props;
		return (machines.length > 1) ? (
			<Button
				text={'switch'}
				textStyle={{
					color : '#3F3F3F',
					fontSize : 20,
					fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
				}}
				btnStyle={{
					backgroundColor : '#FFFF00',
					paddingVertical : 6,
					paddingHorizontal : 15,
					marginVertical : 3
				}}
				borderColor={'#726E1D'}
				icon={{ name : 'exchange' , size : 18 , color : '#3F3F3F' }}
				onPressFunction={()=>switchMachine(navigator,true)}
			/>
		) : null
	}
}

function mapStateToProps(state) {
	return {
		machines : state.game.machines,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		switchMachine
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SwitchButton)
