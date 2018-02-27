import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../../../components/utilities/buttons';
import { shareToFacebook } from '../actions';
import { getUserInfo } from '../../auth/actions';
const botShare = {
	telebot : require('../../../../assets/telebuddies/telebot/telebot_share.png'),
	teleufo : require('../../../../assets/telebuddies/teleufo/ufo.png')
};
const { height , width } = Dimensions.get('window');

class Referral extends Component {
	constructor(props){
		super(props);
		this._telebotPos = new Animated.ValueXY({
			x : -width,
			y : 0
		});
		this._telebotUfo = new Animated.ValueXY({
			x : width,
			y : 0
		});
	}
	componentDidMount(){
		const { getUserInfo } = this.props;
		getUserInfo();
		setTimeout(()=>this._slideInAnimation(),1500);
	}
	_slideInAnimation(){
		Animated.parallel([
			Animated.spring(this._telebotPos,{
				toValue : {
					x : 0,
					y : 0
				}
			}),
			Animated.spring(this._telebotUfo,{
				toValue : {
					x : 0,
					y : 0
				}
			})
		]).start();
	}
	shouldComponenetUpdate(nextProps){
		const { user , version } = this.props;
		return JSON.stringify(user) !== JSON.stringify(nextProps.user) || version !== nextProps.version;
	}
	_renderReferralCode(code){
		const { string , version } = this.props;
		return (version.release === true) ? (
			<View>
				<Text style={[styles.text,{ fontSize : 18 }]}>
					{string['referralCode']}
				</Text>
				<Text style={[styles.text,{ fontSize : 20  }]}>
					{code}
				</Text>
			</View>
		) : null
	}
	_renderShareButton(code){
		const { string , shareToFacebook } = this.props;
		const shareLinkContent = {
			contentType: 'link',
			contentUrl: "https://www.teleclaw.live",
			contentDescription: `${string['shareMsg']}${code}`
		};
		return (
			<Button
				text={'share'}
				textStyle={{ 
					color : 'white' , 
					fontSize : 25 , 
					fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
				}}
				btnStyle={{ 
					backgroundColor : '#3B5998',
					paddingVertical : 10,
					paddingHorizontal : 15
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
					{(user.referral) ? this._renderShareButton(user.referral.code) : null}
				</View>
				<View style={styles.innerContainer}>
					<Animated.Image
						source={botShare['telebot']}
						style={[styles.telebot,this._telebotPos.getLayout()]}
						resizeMode="contain"
					/>
					<Animated.Image
						source={botShare['teleufo']}
						style={[styles.teleufo,this._telebotUfo.getLayout()]}
						resizeMode="contain"
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		paddingVertical : 5,
		marginVertical : 5,
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
		color : '#CF333F',
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
	},
	telebot : {
		height : 70,
		width : 70
	},
	teleufo : {
		height : 40,
		width : 40
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string,
		user : state.auth.user,
		version : state.mis.version
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		shareToFacebook,
		getUserInfo
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Referral);
