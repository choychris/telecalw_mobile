import React, { PropTypes, Component } from 'react';
import { ScrollView , KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , ActionSheetIOS , TouchableOpacity , Platform , Picker , Switch } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserLanguage , setUserPreference } from '../actions';

class SettingForm extends Component {
	shouldComponentUpdate(nextProps){
		const { language , preference , version } = this.props;
		return nextProps.language.locale !== language.locale || nextProps.preference !== preference || version !== nextProps.version;
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
	_renderMusicSetting(string,{ sound }){
		const { setUserPreference , navigator } = this.props;
		return(
			<View style={styles.innerContainer}>
				<Text style={styles.text}>
					{string['sound']}
				</Text>
				<Switch
					value={sound}
					onValueChange={(value)=>setUserPreference(navigator,'sound',value)}
				/>				
			</View>
		)
	}
	_renderVibrationSetting(string,{ vibration }){
		const { setUserPreference , navigator } = this.props;
		return(
			<View style={styles.innerContainer}>
				<Text style={styles.text}>
					{string['vibration']}
				</Text>
				<Switch
					value={vibration}
					onValueChange={(value)=>setUserPreference(navigator,'vibration',value)}
				/>				
			</View>
		)
	}
	_renderUserAvatar(picture){
		return(
			<Image
				style={styles.avatar}
				source={{uri: picture}}
			/>
		)
	}
	render(){
		const { user , language , preference , version } = this.props;
		const { avaLanguage , locale , string } = language;
		//console.warn(JSON.stringify(user.picture));
		//console.warn(locale)
		//console.warn(JSON.stringify(version))
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.text}>
					{`${string['version']} : ${version.version}`}
				</Text>
				{(user.picture !== undefined) ? this._renderUserAvatar(user.picture) : null}
				<Text style={styles.text}>
					{user.name}
				</Text>
				<Text style={styles.text}>
					{user.email}
				</Text>
				{(Platform.OS === 'ios') ? this._renderLanguageIOSPicker(avaLanguage,locale,string) : this._renderLanguageAndroidPicker(avaLanguage,locale,string)}
				{this._renderMusicSetting(string,preference)}
				{this._renderVibrationSetting(string,preference)}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		alignSelf : 'stretch',
		alignItems : 'center',
		paddingVertical : 10,
		height : 400
	},
	innerContainer : {
		flexDirection : 'row',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'space-between',
		padding : 10,
		backgroundColor : 'white',
		marginVertical : 5
	},
	text : {
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		fontSize : 18,
		paddingVertical : 5
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
	},
	avatar : {
		width : 100,
		height : 100,
		borderRadius:50
	}
});

function mapStateToProps(state) {
	return {
		user : state.auth.user,
		language : state.preference.language,
		preference : state.preference.preference,
		version : state.mis.version
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		setUserLanguage,
		setUserPreference
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingForm);
