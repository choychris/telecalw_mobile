import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , ActionSheetIOS , TouchableOpacity , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserLanguage } from '../actions';

class SettingForm extends Component {
	_renderLanguageIOSPicker(avaLanguage,locale,string){
		//console.warn(JSON.stringify(avaLanguage));
		const { setUserLanguage , navigator } = this.props;
		const langDis = Object.keys(avaLanguage)
			.map((langCode)=>avaLanguage[langCode])
			.concat(string['cancel']);
		return(
			<TouchableOpacity 
				style={styles.btn}
				onPress={()=>{
					ActionSheetIOS.showActionSheetWithOptions(
						{
							options: langDis,
							cancelButtonIndex: langDis.length - 1
						},
						(buttonIndex)=>{
							const setLang = Object.keys(avaLanguage)[buttonIndex];
							if(setLang !== undefined) setUserLanguage(setLang,navigator);
						}
					)
				}}
			>
				<Text style={styles.langText}>
					{`${string['language']} : ${avaLanguage[locale]} `}
				</Text>
			</TouchableOpacity>
		)
	}
	render(){
		const { user , language } = this.props;
		const { avaLanguage , locale , string } = language;
		//console.warn(JSON.stringify(user));
		//console.warn(locale)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					{user.name}
				</Text>
				{(Platform.OS === 'ios') ? this._renderLanguageIOSPicker(avaLanguage,locale,string) : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		alignItems : 'center',
		paddingVertical : 10,
		height : 200
	},
	text : {
		fontFamily : 'Silom',
		fontSize : 18
	},
	btn : {
		paddingVertical : 10,
		marginVertical : 10,
		alignSelf : 'stretch',
		alignItems : 'center',
		backgroundColor : 'white'
	},
	langText : {
		fontFamily : 'Silom',
		fontSize : 18,
		color : '#008CFF'
	}
});

function mapStateToProps(state) {
	return {
		user : state.auth.user,
		language : state.preference.language
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		setUserLanguage
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingForm);
