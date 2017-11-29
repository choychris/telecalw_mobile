import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import Button from '../../../components/utilities/buttons';

class Login extends Component {
	_loginFacebook(){
		console.warn('Login Facebook');
	}
	render() {
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'auth'}/>
				<View style={styles.bottom}>
					<Button 
						text={'Facebook Login'}
						textColor={'white'}
						btnColor={'#3B5998'}
						borderColor={'black'}
						onPressFunction={this._loginFacebook}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1
	},
	bottom : {
		position : 'absolute',
		bottom : 0,
		left : 0,
		width : '100%',
		paddingVertical : 50
	}
});

export default connect(null, null)(Login);
