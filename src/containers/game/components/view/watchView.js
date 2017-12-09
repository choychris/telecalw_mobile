import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Video from 'react-native-video';

class WatchView extends Component {
	constructor(props){
		super(props);
		this.state = { onBuffer : true };
	}
	_renderLoading(){
		return <ActivityIndicator style={styles.loader} size="small" color={'white'}/>
	}
	_renderDisplay(balance){
		return (
			<Video 
				style={styles.video}
				source={{uri: "http://live3.teleclaw.win/teleclaw_dev/camera1.m3u8?auth_key=1512795242-0-0-615a68d8adbf2e491f5e1cf9560e1243"}}
				rate={1.0}                              
				volume={0}                            
				muted={true}                           
				paused={false}                          
				resizeMode="contain"                      
				repeat={true}                           
				playInBackground={false}                
				playWhenInactive={false}                
				progressUpdateInterval={250.0}
				onLoad={()=>this.setState({ onBuffer : false })}
				onError={()=>this.setState({ onBuffer : true })}
			/>
		)
	}
	render(){
		const { onBuffer } = this.state;
		return (
			<View style={styles.container}>
				{this._renderDisplay()}
				{(onBuffer === true) ? this._renderLoading() : null }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1 , 
		alignSelf : 'stretch' , 
		alignItems : 'center' , 
		justifyContent : 'center'
	},
	loader : {
		position : 'absolute'
	},
	video : {
		backgroundColor : 'transparent',
		top : Dimensions.get('window').height * 0.11,
		position : 'absolute',
		width	: Dimensions.get('window').width * 0.82,
		height : Dimensions.get('window').height * 0.62
	}
});

export default connect(null,null)(WatchView)
