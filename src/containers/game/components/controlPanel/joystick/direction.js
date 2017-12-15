import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { controlMachine } from '../../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../../components/utilities/buttons';

class Direction extends Component {
	shouldComponentUpdate(){
		return false
	}
	render(){
		const { 
			controlMachine ,
			icon,
			action,
			btnStyle
		} = this.props;
		return (
			<Button
				btnStyle={btnStyle}
				borderColor={'#212121'}
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		controlMachine
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Direction)
