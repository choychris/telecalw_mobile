import React, { PropTypes, Component } from 'react';
import { Image , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const telebotImages = {
	normal : require('../../../assets/telebuddies/telebot/telebot.png'),
	sick : require('../../../assets/telebuddies/telebot/telebot_sick.png'),
	setting : require('../../../assets/telebuddies/telebot/telebot_spanner.png'),
	happy : require('../../../assets/telebuddies/telebot/telebot_happy.png'),
	sad : require('../../../assets/telebuddies/telebot/telebot_sad.png'),
	money : require('../../../assets/telebuddies/telebot/telebot_money.png')
}

class Telebot extends Component {
	shouldComponentUpdate(){
		return false;
	}
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
