import React, { PropTypes, Component } from 'react';
import { View , Text , StyleSheet , TouchableWithoutFeedback , Platform , Dimensions } from 'react-native';
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
			header,
			string
		} = this.props;
		const botStatus = (type) ? type : 'sick';
		return(
			<TouchableWithoutFeedback 
				onPress={()=>errorMessage('hide',navigator)}
			>
				<View style={styles.container}>
					<Text style={styles.title}>{(header) ? header : 'Opps...'}</Text>
					<Text style={styles.title}>
						{(string[title]) ? string[title] : title}
					</Text>
					<View style={styles.image}>
						<Telebot 
							status={botStatus} 
							height={200} 
							width={200}
						/>
					</View>
					<View>
						<Text style={styles.message}>
							{(string[message]) ? string[message] : message}
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignItems : 'center',
		justifyContent : 'center',
		...Platform.select({
			android: {
				height : Dimensions.get('window').height
			}
		})
	},
	title : {
		textAlign : 'center',
		fontFamily : (Platform.OS === 'ios') ? 'Bauhaus 93' : 'Bauhaus-93_6274',
		color : 'white',
		fontSize : 25
	},
	message : {
		width : 200,
		textAlign : 'center',
		fontFamily : (Platform.OS === 'ios') ? 'Bauhaus 93' : 'Bauhaus-93_6274',
		color : 'white',
		fontSize : 18
	},
	image : {
		padding : 20,
		alignItems : 'center',
		justifyContent : 'center'
	}
});

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps ,null)(Error)
