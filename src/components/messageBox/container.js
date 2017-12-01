import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , View , Image , StyleSheet , Dimensions , Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const messageBoxImage = {
	none : require('../../../assets/messagebox/none.png'),
	left : require('../../../assets/messagebox/left.png'),
	right : require('../../../assets/messagebox/right.png')
}
import Prompt from './promopt';
import Buttons from './buttons';

class MessageBox extends Component {
	render(){
		const { type , promptString , buttons , content } = this.props;
		return(
			<View style={styles.container}>
				<Image
					source={messageBoxImage[type]}
					style={styles.image}
					resizeMode='stretch'
				/>	
				<KeyboardAvoidingView 
					behavior="padding" 
					style={styles.formView}
					keyboardVerticalOffset={35}
				>
					{(promptString) ? <Prompt promptString={promptString}/> : null }
					{(content) ? content : null }
					{(buttons) ? <Buttons buttons={buttons}/> : null }
				</KeyboardAvoidingView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		height: Dimensions.get('window').height * 0.85 ,
		width: Dimensions.get('window').width * 0.9 ,
		alignItems : 'center',
		justifyContent : 'center'
	},
	image : {
		position : 'absolute',
		width : '100%',
		height : '95%'
	},
	formView : { 
		backgroundColor : '#EAEAEA' , 
		borderRadius : 30 , 
		alignSelf : 'stretch'
	}
});

export default connect(null,null)(MessageBox);
