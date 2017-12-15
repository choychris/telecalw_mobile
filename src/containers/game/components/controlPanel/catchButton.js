import React, { PropTypes, Component } from 'react';
import { View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { controlMachine } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/utilities/buttons';

class CatchButton extends Component {
	render(){
		const { string , controlMachine } = this.props;
		return (
			<Button
				text={'catch'}
				textStyle={{
					color : 'white',
					fontSize : 20,
					fontFamily : 'Silom',
					fontWeight : 'bold'
				}}
				btnStyle={{
					backgroundColor : '#D10B9D',
					paddingVertical : 18,
					top : 10,
					left : 20
				}}
				borderColor={'#890E6F'}
				onPressFunction={()=>controlMachine('CatchGift',true)}
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

export default connect(mapStateToProps,mapDispatchToProps)(CatchButton)
