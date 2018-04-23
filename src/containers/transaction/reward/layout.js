import React, { PropTypes, Component } from 'react';
import { ScrollView , KeyboardAvoidingView , Animated , 
         Easing , PanResponder , View , Text , Image , 
         ActivityIndicator, StyleSheet , Dimensions , 
         TouchableOpacity , StatusBar , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import BackgroundImage from '../../../components/utilities/backgroundImage';
import StarImages from '../../../components/utilities/starsImage';
import NavBar from '../../../components/navBar/container';
import MessageBox from '../../../components/messageBox/container';
import Referral from './referral';
import Redeem from './redeem';
import { playUISound } from '../../../utils/sound';
import { confirmRedeem } from '../actions';
const { height , width } = Dimensions.get('window');
import { trackScreen } from '../../../utils/analytic';
import { AdMobBanner } from 'react-native-admob';
import RewardedVideoContainer from './missionAds/layout';

class Reward extends Component {
	constructor(props){
		super(props);
		this._floating = new Animated.ValueXY({
			x : width*0.7,
			y : -height*0.12
		});
		this._animation = new Animated.Value(0);
	}
	componentWillMount(){
		const { trackScreen } = this.props;
		trackScreen('Reward');
	}
	componentDidMount(){
		const { playUISound } = this.props;
		this._floatingAnimation();
		setTimeout(()=>{
			playUISound('talking');
			this._fadeAnimation();
		},500);
	}
	shouldComponenetUpdate(nextProps){
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
						x : width*0.7,
						y : -height*0.12 + 5
					},
					easing : Easing.linear
				}),
				Animated.timing(this._floating, {
					duration : 1000,
					toValue : { 
						x : width*0.7,
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
	_renderContainer(){
		return(
			<ScrollView style={styles.innerContainer}>
				<Referral/>
				<Redeem/>
			</ScrollView>
		)
	}
	render(){
		const { navigator , confirmRedeem , version } = this.props;
		const { release } = version;
    let firstViewAdUnitID = (Platform.OS === 'ios') ? "ca-app-pub-5094396211239311/2419865850" : "ca-app-pub-5094396211239311/8392950095";
    const tabs = [
      {
        name: 'referral',
        content: this._renderContainer(),
        buttons: (version.release === true) ? [
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
                  onPressFunction : ()=>confirmRedeem(navigator)
                }
              ] : null
      },
      {
        name: 'mission',
        content: <RewardedVideoContainer />
      }
    ]
		return (
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<StarImages/>
				<NavBar 
					back={true}
					coins={true} 
					navigator={navigator}
				/>
				<KeyboardAvoidingView 
					behavior="position" 
					style={styles.keyboardView}
				>
					<Animated.View 
						style={[this._opacityAnimation()]}
					>
						<MessageBox 
							type={'right'}
							tabs={tabs}
							promptString={(version.release === true) ? 'rewardPrompt' : 'sharePrompt'}
						/>
					</Animated.View>
					<Animated.View 
						style={[this._floating.getLayout()]}
					>
						<Telebot 
							status={'normal'} 
							height={height * 0.1} 
							width={height * 0.1}
						/>
					</Animated.View>
				</KeyboardAvoidingView>
        <AdMobBanner
          adSize="banner"
          adUnitID={firstViewAdUnitID}
          ref={el => (this._basicExample = el)}
          onAdLoaded={()=>{console.log('ad loaded')}}
          onAdFailedToLoad={(evt)=>{console.log(evt)}}
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
	innerContainer : {
		alignSelf : 'stretch',
		height : height * 0.4
	},
	keyboardView: {
		alignSelf : 'stretch' , 
		alignItems : 'center' , 
		flex : 1
	}
});

function mapStateToProps(state) {
	return {
		version : state.mis.version
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		confirmRedeem,
		playUISound,
		trackScreen
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Reward);
