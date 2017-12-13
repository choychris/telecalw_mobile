import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WebRTC from 'react-native-webrtc';
const {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia,
} = WebRTC;
import Request from '../../../../utils/fetch';
import * as webrtcRequest from '../../../../common/api/request/webrtc';
import { saveWebrtcUrl } from '../../actions';
import { errorMessage } from '../../../utilities/actions';
const configuration = {
	"iceServers": [
		{"url": "stun:stun.l.google.com:19302"}
	]
};

const fetchRequest = (serverMethod,headers,data,onSuccess,onFailure,scope, pc, restart) => {
  let method = 'GET';
  let header = null ;
  if(data !== null || data !== undefined){
    method = 'POST';
    header = new Headers("Content-Type", "text/plain");
    data = JSON.stringify(data);
  };
  let init = {
    method: method,
    header: header,
    mode:'cors',
    body: data
  };
  console.log(scope, data);
	let url = `http://webrtcstreamer-env.ap-southeast-1.elasticbeanstalk.com${serverMethod}`
	//let url = `https://webrtc-streamer.herokuapp.com${serverMethod}`
  console.log(url);
  fetch(url, init)
  .then(res => {
    if(res.status === 200 && onSuccess){
      console.log(res._bodyText);
      onSuccess(JSON.parse(res._bodyInit), pc);
    }
    console.log(scope, res)
		if(scope === 'onicecandidate'){
			if(res.status && res.status === 404 && restartCount <= 5){
				console.warn('Auto Restart Mechinsm')
				restart();
			}
		}
  })
  .catch(err => {
		console.log(scope, err)
	})
}

const initiatewebRTC = (userId,saveWebrtcUrl)=>{

    const pc = new RTCPeerConnection(configuration);
 		let peerid = userId;

		pc.onicecandidate = (evt) => {
			if(evt.candidate){
				console.log('onicecandidate', evt.candidate);

				function fetchFunction(){
					fetchRequest(`/addIceCandidate?peerid=${peerid}`, null, evt.candidate, null, null, 'onicecandidate',null,fetchFunction);
				}
				
				fetchFunction();		

			} else {
				console.log('No / End of candidates')
			}
		}
    
		pc.onaddstream = (evt)=>saveWebrtcUrl(evt.stream.toURL());

		pc.oniceconnectionstatechange = function(evt) {  
			//console.warn("oniceconnectionstatechange  state: " + pc.iceConnectionState);
			// After Checking Status -> Settimeout to ensure it is connected , else restart the whole process
			// Garunteed it is connected to initiate game play
			if(pc.iceConnectionState === 'checking'){
				setTimeout(()=>{
					if(pc.iceConnectionState !== 'connected'){
						console.warn('Trigger Restart Mechanism');
						closeWebrtc(userId,pc);
						return initiatewebRTC(userId,saveWebrtcUrl);
					}
				},3000)
			}
		}

		try {
			pc.createOffer(sessionDescription => {
				pc.setLocalDescription(sessionDescription, () => {
					fetchRequest(`/call?peerid=${peerid}&url=${encodeURIComponent('rtsp://188773sc14.iask.in:554/live/sub')}`, null, sessionDescription, onReceiveCall, null, 'setDesc', pc)
				} , err => console.log('setDesc', err))
			}, err => console.log('createOffer', err));
		
			const onReceiveCall = (data, pc) => {
				pc.setRemoteDescription(new RTCSessionDescription(data), () => {
					console.log("setRemoteDescription ok");
					fetchRequest(`/getIceCandidate?peerid=${peerid}`, null, null, onReceiveCandidate ,null , 'remoteDesc', pc)
				},(err) => console.log('remote Desc', err))
			}

			const onReceiveCandidate = (data, pc) => {
				if(data){
					data.map((each, index) => {
						let candidate = new RTCIceCandidate(each);
						pc.addIceCandidate(candidate, () => console.log("addIceCandidate OK"), err => console.log("addIceCandidate Error", err));
					});
				}	
			}
		} 
		catch(e){
			console.warn('Catch Error');
		}

		return pc;

}

const closeWebrtc = (userId,pc)=>{
	fetchRequest(`/hangup?peerid=${userId}`)
	pc.close();
}

class LiveView extends Component {
  constructor(props){
    super(props);
  }
	shouldComponentUpdate(nextProps){
		const { webrtcUrl } = this.props;
		return (nextProps.webrtcUrl !== webrtcUrl);
	}
	componentWillMount(){
		const { navigator } = this.props;
		this.timeout = setTimeout(()=>{
			navigator.resetTo({
				screen : 'app.GamePlayList',
				navigatorStyle : {
					navBarHidden : true
				}
			});
		}, 32000);
	}
  componentDidMount(){
		const { userId , saveWebrtcUrl } = this.props;
		this.pc = initiatewebRTC(userId,saveWebrtcUrl);
  }
	componentWillUnmount(){
		const {	userId } = this.props;
		closeWebrtc(userId,this.pc);
	}
	//<TouchableOpacity
		//onPress={()=>{
			 //closeWebrtc(userId,this.pc);
			//this.pc = initiatewebRTC(userId,saveWebrtcUrl);
		//}}
	//>
		//<Text>{'Restart'}</Text>
	//</TouchableOpacity>
  render() {
		const { webrtcUrl , saveWebrtcUrl , userId } = this.props;
		return (
			<View style={styles.container}>
				{(webrtcUrl !== null) ? <RTCView style={styles.video} streamURL={webrtcUrl}/>	: null }
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
	video : {
		backgroundColor : 'transparent',
		top : Dimensions.get('window').height * 0.09,
		position : 'absolute',
		width	: Dimensions.get('window').width * 0.82,
		height : Dimensions.get('window').height * 0.65
	}
});

function mapStateToProps(state) {
	return {
		userId : state.auth.token.lbToken.userId,
		webrtcUrl : state.game.play.webrtcUrl
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ 
		saveWebrtcUrl
	}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(LiveView);
