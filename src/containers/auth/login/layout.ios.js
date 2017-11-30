import React, { PropTypes, Component } from 'react';
import { View , Text , StatusBar , StyleSheet ,TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginFacebook , accessTokenChecking } from '../actions';
import { languageChecking } from '../../../utils/language';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import Button from '../../../components/utilities/buttons';

class Login extends Component {
	componentWillMount(){
		const { languageChecking ,accessTokenChecking } = this.props;
		// Acess Token Checking
		// User Language Checking
		languageChecking();	
	}
	render() {
		const { loginFacebook , navigator , string } = this.props;
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'auth'}/>
				<View style={styles.bottom}>
					<Button 
						text={string['facebookLogin']}
						textColor={'white'}
						btnColor={'#3B5998'}
						borderColor={'black'}
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

function mapStateToProps(state) {
	return {
		string : state.preference.language.string
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
