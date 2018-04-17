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
const { height , width } = Dimensions.get('window');

class LiveView extends Component {
  constructor(props){
    super(props);
		const { machine , mode } = this.props;
		const camera = filterCamera(machine.cameras,mode);
		this.state = (camera && camera !== null) ? { rtsp : camera.rtspDdnsUrl , webrtcServer : [ camera.webrtcServer, camera.webrtcBackUpServer ] } : { rtsp : null };
  }
	shouldComponentUpdate(nextProps){
		const { webrtcUrl , mode , cameraMode } = this.props;
		return (nextProps.webrtcUrl[mode] !== undefined && nextProps.webrtcUrl[mode] !== webrtcUrl[mode] || cameraMode !== nextProps.cameraMode);
	}

  componentDidMount(){
		const { 
			initiatewebRTC , 
			mode ,
			machine,
			navigator
		} = this.props;
		const { rtsp , webrtcServer, turnserver } = this.state;
    
		if(rtsp !== null){
			if(mode === 'top'){
				setTimeout(()=>{
					this.pc = initiatewebRTC(mode,rtsp,0,webrtcServer);
				},2000)
			} else {
				setTimeout(()=>{
					this.pc = initiatewebRTC(mode,rtsp,0,webrtcServer);
				},3000)
			}
		}
  }
	componentWillUnmount(){
		//const { rtsp , webrtcServer } = this.state;
    const { webrtcUrl, mode } = this.props;
    if(webrtcUrl['front'] !== undefined){
      closeWebrtc(this.pc,webrtcUrl[mode]['rtsp'],webrtcUrl[mode]['webrtcServer']);
    }
	}
	_renderLoading(){
		return <ActivityIndicator style={styles.loader} size="small" color={'white'}/>
	}
  render() {
		const { webrtcUrl , mode , cameraMode } = this.props;
		const opacity = (mode !== cameraMode) ? { bottom : height } : { bottom : -2} ;
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
		width	: Dimensions.get('window').width * 0.82,
		height : Dimensions.get('window').height * 0.64
	},
	video : {
		backgroundColor : 'transparent',
		width	: '100%',
		height : '100%'
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
