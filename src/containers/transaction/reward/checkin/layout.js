import React, { PropTypes, Component } from 'react';
import { Easing , Animated , View , Text , StyleSheet , Image, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../../components/telebuddies/telebot';
const coinsImg = require('../../../../../assets/utilities/coins/telecoins_single.png');
import { playUISound } from '../../../../utils/sound';
import { vibrate } from '../../../../utils/vibrate';

class CheckinReward extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const { playUISound , vibrate } = this.props;
		playUISound('happy');
		vibrate(500);
	} 
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { string , rewardAmount } = this.props;
		return(
			<View style={styles.container}>
				<Text style={[styles.text,styles.title]}>
					{string['checkIn']}
				</Text>
				<Telebot 
					status={'happy'} 
					width={180} 
					height={180}
				/>
				<Text style={[styles.text,styles.desc]}>
					{string['checkinReward']}
				</Text>
				<View style={styles.innerContainer}>
					<Text style={[styles.text,styles.desc]}>
						{`${string['rewardAmount']} : ${rewardAmount}`}
					</Text>
					<Image
						source={coinsImg}
						style={styles.image}
						resizeMode={'contain'}
					/>
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
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'center'
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		playUISound,
		vibrate
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckinReward)
