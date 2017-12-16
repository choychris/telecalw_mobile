import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WebRTC from 'react-native-webrtc';
const { RTCView } = WebRTC;
import { filterCamera } from '../../actions';
import Request from '../../../../utils/fetch';
import { errorMessage } from '../../../utilities/actions';
import { initiatewebRTC , closeWebrtc } from '../../../../utils/webrtc';

class LiveView extends Component {
  constructor(props){
    super(props);
		const { machine , mode } = this.props;
		const camera = filterCamera(machine.cameras,mode);
		this.state = { rtsp : camera.rtspDdnsUrl };
  }
	shouldComponentUpdate(nextProps){
		const { webrtcUrl , mode , cameraMode } = this.props;
		return (nextProps.webrtcUrl[mode] !== webrtcUrl[mode] || cameraMode !== nextProps.cameraMode);
	}
  componentDidMount(){
		const { 
			initiatewebRTC , 
			mode ,
			machine
		} = this.props;
		const { rtsp } = this.state;
		if(mode === 'top'){
			setTimeout(()=>{
				this.pc = initiatewebRTC(mode,rtsp);
			},2000)
		} else {
			setTimeout(()=>{
				this.pc = initiatewebRTC(mode,rtsp);
			},3000)
		}
  }
	componentWillUnmount(){
		const { rtsp } = this.state;
		closeWebrtc(this.pc,rtsp);
	}
	_renderLoading(){
		return <ActivityIndicator style={styles.loader} size="small" color={'white'}/>
	}
  render() {
		const { webrtcUrl , mode , cameraMode } = this.props;
		const opacity = (mode !== cameraMode) ? { opacity : 0 } : {} ;
		return (
			<View style={[opacity,styles.container]}>
				{(webrtcUrl[mode]) ? <RTCView style={styles.video} streamURL={webrtcUrl[mode]['stream']}/>	: this._renderLoading()}
			</View>
		)
  }
}

const styles = StyleSheet.create({
	container : {
		position : 'absolute',
		alignItems : 'center',
		justifyContent : 'center',
		top : Dimensions.get('window').height * 0.12,
		width	: Dimensions.get('window').width * 0.82,
		height : Dimensions.get('window').height * 0.65
	},
	video : {
		backgroundColor : 'transparent',
		width	: Dimensions.get('window').width * 0.82,
		height : Dimensions.get('window').height * 0.65
	}
});

function mapStateToProps(state) {
	return {
		webrtcUrl : state.game.play.webrtcUrl,
		machine : state.game.machine,
		cameraMode : state.game.play.cameraMode
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		initiatewebRTC
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LiveView);