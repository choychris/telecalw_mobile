import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , ActionSheetIOS , TouchableOpacity , Platform , Picker } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserLanguage } from '../actions';

class SettingForm extends Component {
	shouldComponentUpdate(nextProps){
		const { language } = this.props;
		return nextProps.language.locale !== language.locale
	}
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
	_renderLanguageAndroidPicker(avaLanguage,locale,string){
		const { setUserLanguage , navigator } = this.props;
		return(
			<Picker
				style={styles.picker}
				selectedValue={locale}
				onValueChange={(itemValue, itemIndex)=>setUserLanguage(itemValue,navigator)}
			>
				{Object.keys(avaLanguage).map((langCode,index)=><Picker.Item key={index} label={avaLanguage[langCode]} value={langCode}/>)}
			</Picker>
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
				{(Platform.OS === 'ios') ? this._renderLanguageIOSPicker(avaLanguage,locale,string) : this._renderLanguageAndroidPicker(avaLanguage,locale,string)}
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
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
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
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 18,
		color : '#008CFF'
	},
	picker : {
		alignSelf : 'stretch'
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
