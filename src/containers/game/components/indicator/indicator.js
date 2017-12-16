import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const telebuddies = require('../../../../../assets/telebuddies/telebot/telebot_without_eyes.png');
import Eyes from './eyes';

class Indicator extends Component{
	shouldComponentUpdate(){
		return false
	}
	render(){
		return(
			<View style={styles.container}>
				<Image
					source={telebuddies}	
					style={styles.image}
					resizeMode={'contain'}
				/>
				<Eyes/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center',
		top : -Dimensions.get('window').height * 0.35,
		right : Dimensions.get('window').width * 0.09
	},
	image : {
		position : 'absolute',
		height : 90,
		width : 90
	}
})

export default connect(null,null)(Indicator)
