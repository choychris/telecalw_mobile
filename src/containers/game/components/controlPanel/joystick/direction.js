import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { controlMachine } from '../../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../../components/utilities/buttons';

class Direction extends Component {
	render(){
		const { 
			string , 
			controlMachine ,
			icon,
			action,
			btnStyle
		} = this.props;
		return (
			<Button
				btnStyle={btnStyle}
				borderColor={'#890E6F'}
				icon={{ 
					name : icon , 
					size : 20 , 
					color : 'white' 
				}}
				onPressInFunction={()=>controlMachine(action,true)}
				onPressOutFunction={()=>controlMachine(action,false)}
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
		controlMachine
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Direction)
