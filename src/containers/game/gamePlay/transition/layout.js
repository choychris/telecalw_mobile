import React, { PropTypes, Component } from 'react';
import { Easing , Animated, View , Text , StyleSheet , Image , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetTimer } from '../../actions';
import TrafficLight from './trafficLight';
import LightBulb from './lightbulb';
const { height , width } = Dimensions.get('window');
const lightBulbs = [
	{ backgroundColor : '#CF333F'  , borderColor : '#87212D' , bottom : 9 , lightup : 3 },
	{ backgroundColor : '#FFFF00'  , borderColor : '#A09C00' , bottom : 15 , lightup : 2},
	{ backgroundColor : '#2ECC71'  , borderColor : '#208448' , bottom : 23 , lightup : 1}
]

class GameCountDown extends Component {
	constructor(props){
		super(props);
		this.state = { time : null };
		this._position = new Animated.ValueXY({ 
			x : -width , 
			y : -height -100
		});
		this._textAnimation = new Animated.Value(0)
	}
	shouldComponentUpdate(nextProps,nextState){
		const { webrtcUrl } = this.props;
		const { time } = this.state;
		return webrtcUrl !== nextProps.webrtcUrl || nextState.time !== time;
	}
	componentDidUpdate(prevProps){
		const { navigator , webrtcUrl } = this.props;
		if(
			prevProps.webrtcUrl['front'] === undefined && 
			webrtcUrl['front']
		){
			this._textScale();
			this._countDown();
			this._slideDownAnimation();
		}
	}	
	_textScale () {
		this._textAnimation.setValue(0)
		Animated.timing(
			this._textAnimation,
			{
				toValue: 1,
				duration: 5000,
				easing: Easing.linear															
			}	
		).start();
	}
	_slideUpAnimation(){
		Animated.spring(this._position,{
			toValue : { 
				x : (Platform.OS === 'ios') ? 0 : width  , 
				y : -height - 100
			}
		}).start();
	}
	_slideDownAnimation(){
		Animated.spring(this._position,{
			toValue : { 
				x : (Platform.OS === 'ios') ? -width/2.2 : width*0.1 , 
				y : (Platform.OS === 'ios') ? -height/1.6 : -height*0.1
			}
		}).start();
	}
	_renderLoading(){
		return <ActivityIndicator style={{ position : 'absolute'  }} size="small" color={'white'}/>
	}
	_countDown(){
		const { 
			navigator , 
			resetTimer ,
			config
		} = this.props;
		this.countDownFunction = setInterval(()=>{
			const { time } = this.state;
			const nextTime = (time) ? time - 1 : 5 ;
			this.setState({ time : nextTime });
			if(nextTime === 0) {
				this._slideUpAnimation();
				resetTimer(config.gizwits.control.InitCatcher[0]);
				navigator.dismissLightBox();
				clearInterval(this.countDownFunction);
			};
		},1000);
	}
	_renderText(time){
		switch(time){
			case 2:
				return 'READY';
			break;
			case 1:
				return 'GO!!!'
			break;
			default:
				return time;
			break;
		}
	}
	render(){
		const { time } = this.state;
		const textSize = this._textAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [18, 120]					  
		})
		return(
			<View style={styles.container}>
				<Animated.View style={[styles.trafficLighContainer,this._position.getLayout()]}>
					<TrafficLight time={time}/>
					<View style={styles.lightContainer}>
						{lightBulbs.map((bulb,index)=><LightBulb key={index} {...bulb} time={time}/>)}
					</View>
				</Animated.View>
				{(time && time !== null) ? <Animated.Text style={[styles.text,{ fontSize : textSize }]}>{this._renderText(time)}</Animated.Text> : this._renderLoading()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		backgroundColor : 'transparent',
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'center'	,
		...Platform.select({
			android : {
				height : height
			}
		})
	},
	trafficLighContainer : {
		backgroundColor : 'transparent',
		position : 'absolute' , 
		alignItems : 'center' , 
		justifyContent : 'center'
	},
	text : {
		position : 'absolute',
		textAlign : 'center',
		fontFamily : 'Silom',
		color : 'white'
	},
	lightContainer : {
		flexDirection : 'row',
		position : 'absolute',
		bottom : 0
	}
});

function mapStateToProps(state) {
	return { 
		webrtcUrl : state.game.play.webrtcUrl,
		config : state.game.play.config
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		resetTimer
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GameCountDown);
