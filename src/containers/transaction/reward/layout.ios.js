import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import Referral from './referral';
import Redeem from './redeem';
import { confirmRedeem } from '../actions';

class Reward extends Component {
	shouldComponenetUpdate(nextProps){
		return false;
	}
	_renderContainer(){
		return(
			<View style={styles.innerContainer}>
				<Referral/>
				<Redeem/>
			</View>
		)
	}
	render(){
		const { navigator , confirmRedeem } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					back={true}
					coins={true} 
					navigator={navigator}
				/>
				<MessageBox 
					title={'referral'}
					type={'right'}
					content={this._renderContainer()}
					promptString={'rewardPrompt'}
					buttons={[
						{
							text : 'confirm',
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
							onPressFunction : ()=>confirmRedeem()
						}
					]}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center',
		backgroundColor : '#263E50'
	},
	innerContainer : {
		alignSelf : 'stretch'
	},
	keyboardView: {
		alignSelf : 'stretch' , 
		justifyContent : 'flex-start' , 
		alignItems : 'center' , 
		flex : 1
	},
	telebot : {
		position : 'absolute',
		bottom : 0,
		right : 0,
		padding : 5
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		confirmRedeem
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Reward);
