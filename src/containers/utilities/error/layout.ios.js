import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorMessage } from '../actions';
import Telebot from '../../../components/telebuddies/telebot';

class Error extends Component {
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { 
			message, 
			title , 
			navigator ,
			type,
			header
		} = this.props;
		const botStatus = (type) ? type : 'sick';
		return(
			<TouchableWithoutFeedback 
				onPress={()=>errorMessage('hide',navigator)}
			>
				<View style={styles.container}>
					<Text style={styles.title}>{(header) ? header : 'Opps...'}</Text>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.image}>
						<Telebot 
							status={botStatus} 
							height={200} 
							width={200}
						/>
					</View>
					<View>
						<Text style={styles.message}>{message}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center'
	},
	title : {
		textAlign : 'center',
		fontFamily : 'Bauhaus 93',
		color : 'white',
		fontSize : 25
	},
	message : {
		width : 200,
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
