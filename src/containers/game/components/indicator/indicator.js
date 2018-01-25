import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const telebuddies = require('../../../../../assets/telebuddies/telebot/telebot_without_eyes.png');
import Eyes from './eyes';
const { height , width } = Dimensions.get('window');

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
		position : 'absolute',
		bottom : height * 0.7
	},
	image : {
		position : 'absolute',
		height : 90,
		width : 90
	}
})

export default connect(null,null)(Indicator)
