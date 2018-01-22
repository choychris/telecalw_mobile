import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet , Platform , Image , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';

class Characters extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		return (
			<View>
				<Telebot
					status={'front'}
					width={100}
					height={100}
					style={{
						position : 'absolute',
						top : 20
					}}
				/>
			</View>
		)
	}
}

export default connect(null,null)(Characters)

