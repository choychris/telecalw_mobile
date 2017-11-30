import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorMessage } from '../actions';
import Telebot from '../../../components/telebuddies/telebot';

class Error extends Component {
	render(){
		const { message, title , navigator } = this.props;
		return(
			<View>
				<Text style={styles.title}>Opps...</Text>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.image}>
					<Telebot status={'sick'} height={200} width={200}/>
				</View>
				<View>
					<Text style={styles.message}>{message}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title : {
		textAlign : 'center',
		fontFamily : 'Bauhaus 93',
		color : 'white',
		fontSize : 25
	},
	message : {
		textAlign : 'center',
		fontFamily : 'Bauhaus 93',
		color : 'white',
		fontSize : 18
	},
	image : {
		padding : 20,
		alignItems : 'center',
		justifyContent : 'center'
	}
});

export default connect(null ,null)(Error)
