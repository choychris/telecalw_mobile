import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Text , Image , ActivityIndicator, StyleSheet , Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loading } from '../../../utilities/actions';
import { payment , selectRate } from '../../actions';
import Telebot from '../../../../components/telebuddies/telebot';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import StarsImage from '../../../../components/utilities/starsImage';
import NavBar from '../../../../components/navBar/container';
import MessageBox from '../../../../components/messageBox/container';
import RateListContainer from './listContainer';
import TransactionListContainer from '../record/listContainer';
const { height , width } = Dimensions.get('window');

class TopUp extends Component {
	constructor(props){
		super(props);
		const { payment , navigator } = props;
		this._position = new Animated.ValueXY({
			x : -width,
			y : -60
		});
		this._animation = new Animated.Value(0);
		this.state = {
			tabs : [
				{ 
					name : 'topUp' , 
					content : <RateListContainer navigator={navigator}/> ,
					buttons : [
						{
							text : 'confirmText',
							textStyle : {
								color : 'white',
								fontSize : 25,
								fontFamily : 'Silom',
								fontWeight : 'bold'
							},
							btnStyle : {
								backgroundColor : '#4C4C4C',
								paddingVertical : 10,
								paddingHorizontal : 15
							},
							onPressFunction : ()=>payment(navigator)
						}
					]
				},
				{ 
					name : 'transactions',
					content : <TransactionListContainer navigator={navigator}/>
				}
			]
		}
	}
	componentDidMount(){
		setTimeout(()=>this._runAnimation(),1000)
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
	_runAnimation(){
		Animated.spring(this._position,{
			toValue : {
				x : -width*0.35,
				y : -60
			}
		}).start(()=>this._fadeAnimation());
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
		const { 
			navigator 
		} = this.props;
		const { tabs } = this.state;
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
				<Animated.View style={[this._opacityAnimation()]}>
					<MessageBox 
						type={'left'}
						tabs={tabs}
						promptString={'topUpPrompt'}
					/>
				</Animated.View>
				<Animated.View
					style={[this._position.getLayout()]}
				>
					<Telebot 
						status={'money'} 
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
		payment,
		selectRate
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(TopUp);
