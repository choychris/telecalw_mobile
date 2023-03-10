import React, { PropTypes, Component } from 'react';
import { Easing , Animated , View , Text , StyleSheet , Image, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import Button from '../../../components/utilities/buttons';
import { playUISound } from '../../../utils/sound';
import { vibrate } from '../../../utils/vibrate';

class InsufficientFundSuggest extends Component {
	_navigateTo(page){
		const { navigator } = this.props;
		navigator.dismissLightBox({
			animationType : 'slide-down'
		});
		setTimeout(()=>{
			navigator.push({
				screen : page,
				navigatorStyle : {
					navBarHidden : true
				}
			});
		},500);
	}
	_renderActionButton(){
		const { string , version } = this.props;
		const actionButtons = (version.release) ? [
			{ text : 'referral' , function : ()=>this._navigateTo('app.Reward') },
			{ text : 'topUp' , function : ()=>this._navigateTo('app.TopUp')}
		] : [];
		return  actionButtons.map((btn,key)=>(
			<View key={key}>
				<Button
					disable={false}
					btnStyle={{
						backgroundColor : '#545555',
						borderRadius : 10,
						paddingHorizontal : 30,
						paddingVertical : 12,
						marginHorizontal : 20
					}}
					borderColor={'#2D2D2E'}
					onPressFunction={btn.function}
				/>
				<Text style={styles.btnText}>
					{string[btn.text]}
				</Text>
			</View>
		));
	}
	render(){
		const { string } = this.props;
		return(
			<View style={styles.container}>
				<Text style={[styles.text,styles.title]}>
					{string['insufficientFund']}
				</Text>
				<Telebot 
					status={'sad'} 
					width={180} 
					height={180}
				/>
				<Text style={[styles.text,styles.desc]}>
					{string['earnCoins']}
				</Text>
				<View style={styles.innerContainer}>
					{this._renderActionButton()}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		backgroundColor : 'transparent',
		alignItems : 'center',
		justifyContent : 'center'
	},
	title : {
		fontSize : 30,
		marginVertical : 20
	},
	desc : {
		fontSize : 18,
		marginTop : 20
	},
	text : {
		color : 'white',
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		textAlign : 'center'
	},
	image : {
		marginTop : 10,
		marginLeft : 5,
		width : 20,
		height : 20
	},
	innerContainer : {
		alignSelf : 'stretch',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center',
		paddingVertical : 20
	},
	btnText : {
		textAlign : 'center',
		color : '#4A6CFF',
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 20
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		version : state.mis.version
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		playUISound,
		vibrate
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(InsufficientFundSuggest);
