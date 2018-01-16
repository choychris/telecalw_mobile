import React, { PropTypes, Component } from 'react';
import { KeyboardAvoidingView , Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar , ScrollView , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import StarsImage from '../../../components/utilities/starsImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import IssueType from '../cs/issue/issueType';
import IssueForm from '../cs/issue/issueForm';
import { playUISound } from './../../../utils/sound';
import { createIssue } from '../actions';
const { height , width } = Dimensions.get('window');

class CustomerSupport extends Component {
	constructor(props){
		super(props);
		this._position = new Animated.ValueXY({
			x : -width,
			y : -height*0.1
		});
		this._animation = new Animated.Value(0);
	}
	componentDidMount(){
		const { playUISound } = this.props;
		playUISound('talking');
		this._slideAnimation()
	}
	shouldComponentUpdate(){
		return false;
	}
	_slideAnimation(){
		Animated.spring(this._position,{
			toValue : {
				x : 0,
			y : -height*0.1
			}
		}).start(()=>this._fadeAnimation());
	}
	_fadeAnimation(){
		Animated.timing(this._animation, {
			toValue: 1,
			duration: 100,
			easing : Easing.linear
		}).start();
	}
	_renderContainer(){
		return(
			<ScrollView style={styles.innerContainer}>
				<IssueType/>
				<IssueForm/>
			</ScrollView>
		)
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
		const { navigator , createIssue } = this.props;
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
				<KeyboardAvoidingView 
					behavior="position" 
					style={styles.keyboardView}
				>
					<Animated.View style={[this._opacityAnimation()]}>
						<MessageBox 
							title={'issueReport'}
							type={'left'}
							content={this._renderContainer()}
							promptString={'issuePrompt'}
							buttons={[
								{
									text : 'confirm',
									textStyle : {
										color : 'white',
										fontSize : 25,
										fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
									},
									btnStyle : {
										backgroundColor : '#4C4C4C',
										paddingVertical : 10,
										paddingHorizontal : 15
									},
									onPressFunction : ()=>createIssue()
								}
							]}
						/>
					</Animated.View>
					<Animated.View
						style={[this._position.getLayout()]}
					>
						<Telebot 
							status={'postal'} 
							height={height * 0.13} 
							width={height * 0.13}
						/>
					</Animated.View>
				</KeyboardAvoidingView>
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
	innerContainer : {
		height : height * 0.4,
		alignSelf : 'stretch'
	},
	keyboardView: {
		alignSelf : 'stretch' , 
		justifyContent : 'flex-start' , 
		alignItems : 'center' , 
		flex : 1
	},
	telebot : {
		position : 'absolute',
		bottom : -height*0.02,
		right : 0
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		playUISound,
		createIssue
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(CustomerSupport);
