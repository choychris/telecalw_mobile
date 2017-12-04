import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillSignUpForm , confirmSignUp } from '../actions';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import Telebot from '../../../components/telebuddies/telebot';
import MessageBox from '../../../components/messageBox/container';
import AddressForm from '../../../components/form/address';
import PhoneForm from '../../../components/form/phone';
import DeviceInfo from 'react-native-device-info';

class Signup extends Component {
	componentDidMount(){
		const { fillSignUpForm } = this.props;
		fillSignUpForm('SIGNUP_COUNTRY_CODE',DeviceInfo.getDeviceCountry().toLowerCase())
	}
	_renderForm(){
		const { fillSignUpForm } = this.props;
		return(
			<View style={styles.form}>
				<AddressForm 
					dispatchFunction={fillSignUpForm} 
					action={{
						countryCode : 'SIGNUP_COUNTRY_CODE',
						address : 'SIGNUP_ADDRESS'
					}}
				/>	
				<PhoneForm
					dispatchFunction={fillSignUpForm} 
					action='SIGNUP_PHONE'
				/>
			</View>
		)
	}
	render(){
		const { confirmSignUp , navigator } = this.props;
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<MessageBox 
					type={'right'}
					promptString={'signupPrompt'}
					content={this._renderForm()}
					buttons={[
						{ 
							text : 'confirmText',
							textColor : 'white',
							btnColor : '#E63946',
							borderColor : 'black',
							onPressFunction : ()=>confirmSignUp(navigator)
						}		
					]}
				/>
				<View style={styles.telebot}>
					<Telebot 
						status={'normal'} 
						height={100} 
						width={100}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center'
	},
	telebot : {
		position : 'absolute',
		bottom : 0,
		right : 0,
		padding : 5
	},
	form : {
		backgroundColor : 'transparent',
		marginVertical : 5,
		alignSelf : 'stretch'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		fillSignUpForm,
		confirmSignUp
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Signup);
