import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const telebuddies = require('../../../../../assets/telebuddies/telebot/telebot_without_eyes.png');

class Indicator extends Component{
	render(){
		return(
			<View style={styles.container}>
				<Image
					source={telebuddies}	
					style={styles.image}
					resizeMode={'contain'}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		position : 'absolute',
		top : -16,
		left : Dimensions.get('window').height * 0.16
	},
	image : {
		height : 80,
		width : 80
	}
})

export default connect(null,null)(Indicator)
