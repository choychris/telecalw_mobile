import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import StarsImage from '../../../components/utilities/starsImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import { playUISound } from '../../../utils/sound';
import { getUserInfo , logout } from '../../auth/actions';
import SettingForm from './form';
const { height , width } = Dimensions.get('window');

class Setting extends Component {
	constructor(props){
		super(props);
		this._floating = new Animated.ValueXY({
			x : width*0.35,
			y : -height*0.12
		});
		this._animation = new Animated.Value(0);
	}
	componentDidMount(){
		const { getUserInfo , playUISound } = this.props;
		getUserInfo();
		this._floatingAnimation();
		playUISound('talking');
		setTimeout(()=>this._fadeAnimation(),500);
	}
	shouldComponentUpdate(){
		return false;
	}
	_fadeAnimation(){
		Animated.timing(this._animation, {
			toValue: 1,
			duration: 100,
			easing : Easing.linear
		}).start()
	}
	_floatingAnimation(){
		Animated.loop(
			Animated.sequence([
				Animated.timing(this._floating, {
					duration : 1000,
					toValue : { 
						x : width*0.35,
						y : -height*0.12 + 5
					},
					easing : Easing.linear
				}),
				Animated.timing(this._floating, {
					duration : 1000,
					toValue : { 
						x : width*0.35,
						y : -height*0.12
					},
					easing : Easing.linear
				})
			])
		).start();
	}
	_opacityAnimation(){
		return {
			opacity: this._animation.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			})
		}
	}
	render(){
		const { navigator , logout } = this.props;
		return (
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<StarsImage/>
				<NavBar 
					back={true}
					coins={true} 
					navigator={navigator}
				/>
				<Animated.View style={[this._opacityAnimation()]}>
					<MessageBox 
						title={'setting'}
						type={'right'}
						content={<SettingForm navigator={navigator}/>}
						promptString={'settingPrompt'}
						buttons={[
							{   
								text : 'logout',
								textStyle : {
									color : 'white',
									fontSize : 25,
									fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
								},
								btnStyle : {
									backgroundColor : '#E63946',
									paddingVertical : 10,
									paddingHorizontal : 15
								},
								borderColor : '#8E2633',
								onPressFunction : ()=>logout(null,navigator)
							}
						]}
					/>
				</Animated.View>
				<Animated.View 
					style={[this._floating.getLayout()]}
				>
					<Telebot 
						status={'setting'} 
						height={height * 0.13} 
						width={height * 0.13}
					/>
				</Animated.View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center',
		backgroundColor : '#263E50'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		getUserInfo,
		logout,
		playUISound
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(Setting);
