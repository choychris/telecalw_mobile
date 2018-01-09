import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../../../components/utilities/buttons';
import { shareToFacebook } from '../actions';
import { getUserInfo } from '../../auth/actions';
const botShare = {
	telebot : require('../../../../assets/telebuddies/telebot/telebot_share.png'),
	teleufo : require('../../../../assets/telebuddies/telebot/ufo.png')
}

class Referral extends Component {
	componentDidMount(){
		const { getUserInfo } = this.props;
		getUserInfo();
	}
	shouldComponenetUpdate(nextProps){
		const { user } = this.props;
		return JSON.stringify(user) !== JSON.stringify(nextProps.user);
	}
	_renderReferralCode(code){
		const { string } = this.props;
		return (
			<View>
				<Text style={[styles.text,{ fontSize : 22 }]}>
					{string['referralCode']}
				</Text>
				<Text style={[styles.text,{ fontSize : 20  }]}>
					{code}
				</Text>
			</View>
		)
	}
	_renderShareButton(){
		const { string , shareToFacebook } = this.props;
		const shareLinkContent = {
			contentType: 'link',
			contentUrl: "https://facebook.com",
			contentDescription: 'Wow, check out this great site!'
		};
		return (
			<Button
				text={'share'}
				textStyle={{ 
					color : 'white' , 
					fontSize : 25 , 
					fontFamily : 'Silom' ,
					fontWeight : 'bold'
				}}
				btnStyle={{ 
					backgroundColor : '#3B5998',
					paddingVertical : 15,
					paddingHorizontal : 20
				}}
				icon={{ name : 'share' , size : 18 , color : 'white' }}
				borderColor={'#203559'}
				onPressFunction={()=>shareToFacebook(shareLinkContent)}
			/>
		)
	}
	render(){
		const { user } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					{(user.referral) ? this._renderReferralCode(user.referral.code) : null}
					{this._renderShareButton()}
				</View>
				<View style={styles.innerContainer}>
					<Image
						source={botShare['telebot']}
						style={styles.telebot}
					/>
					<Image
						source={botShare['teleufo']}
						style={styles.teleufo}
						resizeMode="contain"
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		paddingVertical : 10,
		marginVertical : 10,
		borderColor : '#C9C9C9',
		borderBottomWidth : 1
	},
	innerContainer : {
		flexDirection : 'row',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'space-around',
	},
	text : {
		marginVertical : 2,
		textAlign : 'center',
		fontFamily : 'Silom',
		color : '#CF333F',
		fontWeight : 'bold'
	},
	telebot : {
		height : 80,
		width : 80
	},
	teleufo : {
		height : 50,
		width : 50
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		user : state.auth.user
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		shareToFacebook,
		getUserInfo
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Referral);
