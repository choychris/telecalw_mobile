import React, { PropTypes, Component } from 'react';
import { Animated , View , Text , Image , StyleSheet , TouchableOpacity , ActivityIndicator , Dimensions , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { filterCamera } from '../../actions';
import Video from 'react-native-video';

class WatchView extends Component {
	constructor(props){
		super(props);
		this.state = { onBuffer : true };
	}
	shouldComponentUpdate(nextProps,nextState){
		const { onBuffer } = this.state;
		return nextState.onBuffer !== onBuffer;
	}
	_renderLoading(){
		return <ActivityIndicator style={styles.loader} size="small" color={'white'}/>
	}
	_renderDisplay(frontCamera){
		return (
			<Video 
				style={styles.video}
				source={{uri: frontCamera.alibabaSetting.m3u8}}
				volume={0}                            
				muted={true}                           
				paused={false}                          
				resizeMode="contain"                      
				repeat={true}                           
				playInBackground={false}                
				playWhenInactive={false}                
				progressUpdateInterval={250.0}
				onLoad={()=>this.setState({ onBuffer : false })}
				onError={(e)=>{
					console.warn(JSON.stringify(e))
					this.setState({ onBuffer : true })
				}}
			/>
		)
	}
	render(){
		const { machine , mode } = this.props;
		const { onBuffer } = this.state;
		const frontCamera = filterCamera(machine.cameras,mode);
		const frontCameraExist = (machine.cameras && machine.cameras.length > 0 && frontCamera) ? true : false;
		return (
			<View style={styles.container}>
				{(frontCameraExist === true) ? this._renderDisplay(frontCamera) : null}
				{(frontCameraExist === true && onBuffer === true) ? this._renderLoading() : null }
				<View style={styles.infoBoard}>
					<Text style={styles.text}>{machine.name}</Text>
				</View>
			</View>
		);
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
		top : Dimensions.get('window').height * 0.09,
		position : 'absolute',
		width	: Dimensions.get('window').width * 0.82,
		height : Dimensions.get('window').height * 0.65
	},
	infoBoard : {
		position : 'absolute',
		backgroundColor : 'black',
		paddingVertical : 15,
		paddingHorizontal : 30,
		borderRadius : 3,
		borderColor : '#95989A',
		borderTopWidth : 5,
		borderRightWidth : 3,
		borderLeftWidth : 3,
		top : Dimensions.get('window').height * 0.01
	},
	text : {
		fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
		backgroundColor : 'transparent',
		color : '#FCFFB4'
	}
});

function mapStateToProps(state) {
	return {
		machine : state.game.machine
	}
}

export default connect(mapStateToProps,null)(WatchView)
