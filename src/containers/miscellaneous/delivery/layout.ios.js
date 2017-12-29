import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { fillSignUpForm , confirmSignUp } from '../actions';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import Telebot from '../../../components/telebuddies/telebot';
import MessageBox from '../../../components/messageBox/container';
import NavBar from '../../../components/navBar/container';
import GamePlaySelect from '../delivery/play/listContainer';

class Delivery extends Component {
	constructor(props){
		super(props);
		// Possible State of Display :
		// 1. gamePlaySelect
		// 2  logisticForm
		// 3. quoteSelect
		this.state = { display : 'gamePlaySelect' };
	}
	componentDidMount(){
		//const { fillSignUpForm } = this.props;
		//fillSignUpForm('SIGNUP_COUNTRY_CODE',DeviceInfo.getDeviceCountry().toLowerCase())
	}
	//_renderForm(){
		//const { fillSignUpForm } = this.props;
		//return(
			//<View style={styles.form}>
				//<AddressForm 
					//dispatchFunction={fillSignUpForm} 
					//action={{
						//countryCode : 'SIGNUP_COUNTRY_CODE',
						//address : 'SIGNUP_ADDRESS'
					//}}
				///>	
				//<PhoneForm
					//dispatchFunction={fillSignUpForm} 
					//action='SIGNUP_PHONE'
				///>
			//</View>
		//)
	//}
	_renderContent(display){
		switch(display){
			case 'gamePlaySelect':
				return <GamePlaySelect/>
			break;
		}
	}
	_renderBtn(display){
		switch(display){
			case 'gamePlaySelect':
				return [{
					text : 'ship',
					textStyle : {
						color : 'white',
						fontSize : 25,
						fontFamily : 'Silom',
						fontWeight : 'bold'
					},
					btnStyle : {
						backgroundColor : '#4C4C4C',
						paddingVertical : 15,
						paddingHorizontal : 20
					},
					onPressFunction : ()=>{}
				}]
			break;
		}
	}
	render(){
		const { navigator } = this.props;
		const { display } = this.state;
		const displayContent = this._renderContent(display);
		const displayBtn = this._renderBtn(display);
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					back={true}
					coins={true} 
					navigator={navigator}
				/>
				<MessageBox 
					title={'delivery'}
					type={'right'}
					promptString={'deliveryPrompt'}
					content={displayContent}
					buttons={displayBtn}
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
		//fillSignUpForm,
		//confirmSignUp
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Delivery);
