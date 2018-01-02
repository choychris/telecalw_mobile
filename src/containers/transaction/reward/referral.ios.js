import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../../../components/utilities/buttons';
import { shareToFacebook } from '../actions';

class Referral extends Component {
	_renderReferralCode(){
		const { string } = this.props;
		return (
			<View>
				<Text style={[styles.text,{ fontSize : 22 }]}>
					{string['referralCode']}
				</Text>
				<Text style={[styles.text,{ fontSize : 20  }]}>
					{'xsed!452'}
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
		return (
			<View style={styles.container}>
				{this._renderReferralCode()}
				{this._renderShareButton()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flexDirection : 'row',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'space-around',
		paddingVertical : 10,
		marginVertical : 10,
		borderColor : '#C9C9C9',
		borderBottomWidth : 1
	},
	text : {
		marginVertical : 2,
		textAlign : 'center',
		fontFamily : 'Silom',
		color : '#CF333F',
		fontWeight : 'bold'
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		shareToFacebook
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Referral);
