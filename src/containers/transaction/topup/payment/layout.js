import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , 
         View , Text , Image , ActivityIndicator, 
         StyleSheet , Dimensions , TouchableOpacity , 
         StatusBar , Platform, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../../utilities/actions';
import { payment , selectRate } from '../../actions';
import { playUISound } from '../../../../utils/sound';
import Telebot from '../../../../components/telebuddies/telebot';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import StarsImage from '../../../../components/utilities/starsImage';
import NavBar from '../../../../components/navBar/container';
import MessageBox from '../../../../components/messageBox/container';
import RateListContainer from './listContainer';
import TransactionListContainer from '../record/listContainer';
const { height , width } = Dimensions.get('window');
import { trackScreen } from '../../../../utils/analytic';
import AdsBanner from '../../../../components/AdsBanner';

class TopUp extends Component {
	constructor(props){
		super(props);
		const { payment , navigator } = props;
		// this._position = new Animated.ValueXY({
		// 	x : 0,
		// 	y : -height*0.12
		// });
    this._swing = new Animated.Value(0);
		this._animation = new Animated.Value(0);
		this.state = {
			tabs : [
				{ 
					name : 'transactions',
					content : <TransactionListContainer navigator={navigator}/>
				}
			]
		}
	}
	componentWillMount(){
		const { trackScreen } = this.props;
		trackScreen('TopUp');
	}
	componentDidMount(){
		const { playUISound } = this.props;
		setTimeout(()=>{
			this.sound = playUISound('coins');
			this._fadeAnimation();
		},2000)
    this._swingAnimation();
	}
	shouldComponentUpdate(){
		return false;
	}
	componentWillUnmount(){
		const { selectRate } = this.props;
		// Reset Rate Selection
		selectRate(null);
	}
	_fadeAnimation(){
		Animated.timing(this._animation, {
			toValue: 1,
			duration: 100,
			easing : Easing.linear
		}).start()
	}
  _swingAnimation(){
    this._swing.setValue(0);
    Animated.timing(this._swing, {
      toValue: 1,
      duration: 2000,
      easing : Easing.linear
    }).start(() => this._swingAnimation())
  }
	// _runAnimation(){
	// 	Animated.spring(this._position,{
	// 		toValue : {
	// 			x : -width*0.35,
	// 			y : -height*0.12
	// 		}
	// 	}).start(()=>this._fadeAnimation());
	// }
	_opacityAnimation(){
		return {
			opacity: this._animation.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			})
		}
	}
	render(){
		const { 
			navigator ,
			version,
			payment
		} = this.props;
		let { tabs } = this.state;
    const swing = this._swing.interpolate({
      inputRange: [0, 0.25, 0.5, 0.9, 1],
      outputRange: ['0deg', '15deg', '0deg', '-5deg', '0deg']
    })
		if(version.release === true){
			tabs.unshift(
				{ 
					name : 'topUp' , 
					content : <RateListContainer navigator={navigator}/> ,
					buttons : [
						{
							text : 'confirmText',
							textStyle : {
								color : 'white',
								fontSize : 25,
								fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
							},
							btnStyle : {
								backgroundColor : '#4C4C4C',
								paddingVertical : 10,
								paddingHorizontal : 15
							},
							onPressFunction : ()=>payment(navigator)
						}
					]
				}
			)
		}
		return(
			<View style={styles.container}>
				<StatusBar hidden={true}/>
				<BackgroundImage type={'random'}/>
				<StarsImage/>
				<NavBar 
					back={true}
					coins={true} 
					coinsDisable={true}
					navigator={navigator}
				/>
        <KeyboardAvoidingView 
          behavior="position" 
          style={styles.keyboardView}
        >
  				<Animated.View style={[this._opacityAnimation()]}>
  					<MessageBox 
  						type={'left'}
  						tabs={tabs}
  						promptString={(version.release === true) ? 'topUpPrompt' : 'recordPrompt'}
  					/>
  				</Animated.View>
  				<Animated.View
  					style={[{bottom: height*0.12, left: 0}, {transform: [{rotate: swing}]}]}
  				>
  					<Telebot 
  						status={'money'} 
  						height={height * 0.1} 
  						width={height * 0.1}
  					/>
  				</Animated.View>
        </KeyboardAvoidingView>
        <AdsBanner/>
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
		payment,
		selectRate,
		playUISound,
		trackScreen
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(TopUp);
