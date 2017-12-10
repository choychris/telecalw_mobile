import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const tubeImage = require('../../../../assets/utilities/sific_tube.png');
import FastImage from 'react-native-fast-image'
import RoomPanel from './controlPanel/roomPanel';
import WatchView from './view/watchView';

class GameContainer extends Component {
	componentWillMount(){
		const { height , width } = Dimensions.get('window');
		this._itemPosition = new Animated.ValueXY({ x : 0 , y : height });
		this._slideDownAnimation();
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
	_renderVideoView(mode){
		return (mode === 'room') ? <WatchView/> : null;
	}
	_renderPanel(mode,navigator){
		return (mode === 'room') ? (
			<RoomPanel 
				navigator={navigator} 
				slideUpAnimation={()=>this._slideUpAnimation()}
				slideDownAnimation={()=>this._slideDownAnimation()}
			/>
		) : null ;
	}
	render(){
		const { navigator , mode } = this.props;
		return (
			<Animated.View style={[styles.container,this._itemPosition.getLayout()]}>
				{this._renderUpperTube()}	
				{this._renderVideoView(mode)}
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
	}
});

export default connect(null,null)(GameContainer);
