import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddressForm from './form/address';
import PhoneForm from './form/phone';
import TargetForm from './form/target';
import { fillLogisticForm , changeLogisticTarget } from '../../actions';

class LogisticForm extends Component { 
	render(){
		const { 
			fillLogisticForm , 
			changeLogisticTarget ,
			logistic,
			user
		} = this.props;
		const { target } = logistic;
		//console.warn(JSON.stringify(logistic));
		//console.warn(JSON.stringify(user));
		return(
			<View style={styles.form}>
				<TargetForm
					dispatchFunction={changeLogisticTarget} 
				/>
				<AddressForm 
					dispatchFunction={fillLogisticForm} 
					value={(this.props[target]['address']) ? this.props[target]['address'] : {}}
				/>	
				<PhoneForm
					dispatchFunction={fillLogisticForm} 
					value={(this.props[target]['address']) ? this.props[target]['address']['phone'] : ''}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	form : {
		backgroundColor : 'transparent',
		marginVertical : 5,
		alignSelf : 'stretch'
	}
});

function mapStateToProps(state) {
	return {
		user : state.auth.user,
		logistic : state.mis.logistic
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		fillLogisticForm,
		changeLogisticTarget
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LogisticForm)
