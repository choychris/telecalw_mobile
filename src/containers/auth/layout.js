import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginFacebook , accessTokenChecking } from './actions';
import { languageChecking } from '../../utils/language';
import BackgroundImage from '../../components/utilities/backgroundImage';
import Button from '../../components/utilities/buttons';

class Login extends Component {
	componentWillMount(){
		const { languageChecking ,accessTokenChecking , navigator } = this.props;
		// Acess Token Checking
		accessTokenChecking(navigator);
		// User Language Checking
		languageChecking();	
	}
	render() {
		const { loginFacebook , navigator } = this.props;
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'auth'}/>
				<View style={styles.bottom}>
					<Button 
						text={'facebookLogin'}
						textStyle={{ 
							color : 'white' , 
							fontSize : 25 , 
							fontFamily : 'Bauhaus 93' ,
							fontWeight : 'bold'
						}}
						btnStyle={{ 
							backgroundColor : '#3B5998',
							paddingVertical : 10,
							paddingHorizontal : 20
						}}
						borderColor={'#203559'}
						onPressFunction={()=>loginFacebook(navigator)}
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


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		loginFacebook , 
		accessTokenChecking,
		languageChecking
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Login);
