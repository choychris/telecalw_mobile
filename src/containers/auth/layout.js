import React, { PropTypes, Component } from 'react';
import { View , StatusBar , StyleSheet , Platform , Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginFacebook , accessTokenChecking } from './actions';
import { languageChecking } from '../../utils/language';
import BackgroundImage from '../../components/utilities/backgroundImage';
import StarsImage from '../../components/utilities/starsImage';
import Button from '../../components/utilities/buttons';
const logos = {
	en : require('../../../assets/logo/logo_en.png'),
	zhHant : require('../../../assets/logo/logo_zhHant.png')
};

class Login extends Component {
	shouldComponentUpdate(nextProps){
		const { language } = this.props;
		return language.locale !== nextProps.language.locale;
	}
	componentWillMount(){
		const { languageChecking ,accessTokenChecking , navigator } = this.props;
		// Acess Token Checking
		accessTokenChecking(navigator);
		// User Language Checking
		languageChecking();	
	}
	_renderLogo(locale){
		return (
			<Image
				source={logos[locale]}
				style={styles.logo}
				resizeMode={'contain'}
			/>
		)
	}
	render() {
		const { loginFacebook , navigator , language } = this.props;
		const { locale , string } = language;
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<StarsImage/>
				{this._renderLogo(locale)}
				<View style={styles.bottom}>
					<Button 
						text={string['facebookLogin']}
						textStyle={{ 
							color : 'white' , 
							fontSize : 25 , 
							fontFamily : (Platform.OS === 'ios') ? 'Bauhaus 93' : 'Bauhaus-93_6274'
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
		flex : 1,
		alignItems : 'center'
	},
	bottom : {
		position : 'absolute',
		bottom : 0,
		left : 0,
		width : '100%',
		paddingVertical : 50
	},
	logo : {
		position : 'absolute',
		top : 0,
		width : '86%',
		height : '30%'
	}
});

function mapStateToProps(state) {
	return {
		language : state.preference.language
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		loginFacebook , 
		accessTokenChecking,
		languageChecking
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
