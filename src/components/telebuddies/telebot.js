import React, { PropTypes, Component } from 'react';
import { Image , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const telebotImages = {
	normal : require('../../../assets/telebuddies/telebot/telebot.png'),
	sick : require('../../../assets/telebuddies/telebot/telebot_sick.png')
}

class Telebot extends Component {
	render(){
		const { status , height , width } = this.props;
		const imageStyle= { width : width , height : height };
		return(
			<Image
			 source={telebotImages[status]}
			 style={imageStyle}
			 resizeMode="contain"
			/>
		)
	}
}

export default connect(null,null)(Telebot)
