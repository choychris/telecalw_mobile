import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { filterFrontCamera } from '../../actions';
import Video from 'react-native-video';

class WatchView extends Component {
	constructor(props){
		super(props);
		this.state = { onBuffer : true };
	}
	_renderLoading(){
		return <ActivityIndicator style={styles.loader} size="small" color={'white'}/>
	}
	_renderDisplay(frontCamera){
		return (
			<Video 
				style={styles.video}
				source={{uri: frontCamera.alibabaSetting.m3u8}}
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
		const { machine } = this.props;
		const { onBuffer } = this.state;
		const frontCamera = filterFrontCamera(machine.cameras);
		return (machine.cameras && machine.cameras.length > 0 && frontCamera) ? (
			<View style={styles.container}>
				{this._renderDisplay(frontCamera)}
				{(onBuffer === true) ? this._renderLoading() : null }
			</View>
		) : null ;
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

function mapStateToProps(state) {
	return {
		machine : state.game.machine
	}
}

export default connect(mapStateToProps,null)(WatchView)
