import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import Telebot from '../../../components/telebuddies/telebot';
import MessageBox from '../../../components/messageBox/container';
import AddressForm from '../../../components/form/address';

class Signup extends Component {
	_renderForm(){
		return(
			<View style={styles.form}>
				<AddressForm/>	
			</View>
		)
	}
	render(){
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
							onPressFunction : ()=>{
								alert("hi")
							}
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

export default connect(null,null)(Signup);
