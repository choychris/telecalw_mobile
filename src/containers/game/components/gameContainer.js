import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { machineStatus } from '../actions';
const tubeImage = require('../../../../assets/utilities/sific_tube.png');
import FastImage from 'react-native-fast-image'
import RoomPanel from './controlPanel/roomPanel';
import PlayPanel from './controlPanel/playPanel';
import WatchView from './view/watchView';
import LiveView from './view/liveView';
import RefreshButton from './controlPanel/refreshButton';
import Indicator from './indicator/indicator';

class GameContainer extends Component {
	componentWillMount(){
		const { mode , machineStatus } = this.props;
		const { height , width } = Dimensions.get('window');
		this._itemPosition = new Animated.ValueXY({ x : 0 , y : height });
		this._slideDownAnimation();
		if(mode === 'room'){
			// Initiate Machine Status Listner
			machineStatus('start');
		}
	}
	componentWillUnmount(){
		const { machineStatus , mode } = this.props;
		if(mode === 'room'){
			// Leave Machine Channel
			machineStatus('leave');
		}
	}
	_slideDownAnimation(){
		Animated.spring(this._itemPosition,{
			toValue : { x : 0 , y : 0  }
		}).start();
	}
	_slideUpAnimation(){
		Animated.spring(this._itemPosition,{
			toValue : { x : 0 , y : -Dimensions.get('window').height }
		}).start();
	}
	_renderUpperTube(){
		return (
			<Image 
				source={tubeImage}
				style={styles.image}
				resizeMode={'stretch'}	
			/>
		)
	}
	_renderVideoView(mode,navigator){
		const { switchMode } = this.props;
		return (mode === 'room') ? 
			<WatchView mode={'front'}/> : 
			<View style={styles.viewContainer}>
				<Indicator/>
				<LiveView mode={'front'} navigator={navigator}/>
				<LiveView mode={'top'} navigator={navigator}/>
				<RefreshButton/>
			</View>;
	}
	_renderPanel(mode,navigator){
		return (mode === 'room') ? (
			<RoomPanel 
				navigator={navigator} 
				slideUpAnimation={()=>this._slideUpAnimation()}
				slideDownAnimation={()=>this._slideDownAnimation()}
			/>
		) : (<PlayPanel 
			navigator={navigator}
		/>)
	}
	render(){
		const { navigator , mode } = this.props;
		return (
			<Animated.View style={[styles.container,this._itemPosition.getLayout()]}>
				{this._renderUpperTube()}	
				{this._renderVideoView(mode,navigator)}
				{this._renderPanel(mode,navigator)}
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignSelf : 'stretch',
		alignItems : 'center',
		justifyContent : 'flex-end'
	},
	image : {
		position : 'absolute',
		width	: Dimensions.get('window').width + 1,
		height : Dimensions.get('window').height - 60
	},
	viewContainer : {
		flex : 1 , 
		alignSelf : 'stretch' , 
		alignItems : 'center' , 
		justifyContent : 'center'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		machineStatus
	}, dispatch)
}

export default connect(null,mapDispatchToProps)(GameContainer);
