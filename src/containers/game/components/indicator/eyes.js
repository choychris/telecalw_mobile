import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const telebuddies = require('../../../../../assets/telebuddies/telebot/telebot_without_eyes.png');
import Icon from 'react-native-vector-icons/FontAwesome';

class Eyes extends Component{
	shouldComponentUpdate(nextProps){
		const { lastAction } = this.props;
		return lastAction !== nextProps.lastAction;
	}
	render(){
		const { lastAction } = this.props;
		switch(lastAction){
			case 'MoveLeft':
			case 'MoveDown':
			case 'MoveUp':
			case 'MoveRight':
				return(
					<View style={styles.container}>
						<Icon 
							style={styles.leftEye} 
							name={"caret-"+lastAction.replace('Move','').toLowerCase()} 
							color={"#FCFFB4"} 
							size={15}
						/>
						<Icon 
							style={styles.rightEye} 
							name={"caret-"+lastAction.replace('Move','').toLowerCase()} 
							color={"#FCFFB4"} 
							size={15}
						/>
					</View>
				)
			break;
			case 'CatchGift':
				return(
					<View style={styles.container}>
						<Icon 
							style={styles.leftEye} 
							name={'chevron-right'}
							color={"#FCFFB4"} 
							size={12}
						/>
						<Icon 
							style={styles.rightEye} 
							name={'chevron-left'}
							color={"#FCFFB4"} 
							size={12}
						/>
					</View>
				)
			break;
			default:
				return(
					<View style={styles.container}>
						<View style={[styles.eyes,styles.leftEye]}>
						</View>
						<View style={[styles.eyes,styles.rightEye]}>
						</View>
					</View>
				)
			break;
		}
	}
}

const styles = StyleSheet.create({
	container : {
		width : 20,
		height : 20,
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'space-around',
		top : -4,
		right : -24
	},
	eyes : { 
		height : 8,
		width : 4,
		borderRadius : 30,
		backgroundColor : '#FCFFB4'
	},
	leftEye : {
		bottom : -0.5
	},
	rightEye : {
		top : -0.5
	}
})

function mapStateToProps(state) {
	return {
		lastAction : state.game.play.lastAction
	}
}

export default connect(mapStateToProps,null)(Eyes)
