import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import { getUserInfo } from '../../auth/actions';
import SettingForm from './form';
const height = Dimensions.get('window').height;

class Setting extends Component {
	componentDidMount(){
		const { getUserInfo } = this.props;
		getUserInfo();
	}
	shouldComponentUpdate(){
		return false;
	}
	render(){
		const { navigator } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<NavBar 
					back={true}
					coins={true} 
					navigator={navigator}
				/>
				<MessageBox 
					title={'setting'}
					type={'right'}
					content={<SettingForm navigator={navigator}/>}
					promptString={'settingPrompt'}
				/>
				<Telebot 
					style={styles.telebot}
					status={'setting'} 
					height={height * 0.13} 
					width={height * 0.13}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center',
		backgroundColor : '#263E50'
	},
	telebot : {
		position : 'absolute',
		bottom : 0,
		right : 0,
		margin : 5
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		getUserInfo
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Setting);
