import WebRTC from 'react-native-webrtc';
import { Platform } from 'react-native';
const {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} = WebRTC;
const configuration = {
	"iceServers": [
		{"url": "stun:stun.l.google.com:19302"}
	]
};
import { webrtcUrl } from '../config/env.js';

const fetchRequest = (serverMethod,headers,data,onSuccess,onFailure,scope, pc, restart) => {
  let method = 'GET';
  let header = null ;
  if(data !== null || data !== undefined){
    method = 'POST';
    header = { "Content-Type" : "text/plain" };
    data = JSON.stringify(data);
  };
  let init = {
    method: method,
    header: header,
    mode:'cors',
    body: data
  };
  console.log(scope, data);
	//let url = `http://webrtcstreamer-env.ap-southeast-1.elasticbeanstalk.com${serverMethod}`
	//let url = `http://default-environment.25k6y4yfum.us-west-2.elasticbeanstalk.com${serverMethod}`
	//let url = `https://webrtc-streamer.herokuapp.com${serverMethod}`
	let url = `${webrtcUrl()}${serverMethod}`;
  //console.log(url);
  fetch(url, init)
  .then(res => {
    if(res.status === 200 && onSuccess){
      console.log(res._bodyText);
      onSuccess(JSON.parse(res._bodyInit), pc);
    }
    //console.log(scope, res)
		//if(scope === 'onicecandidate'){
			//if(res.status && res.status === 404 && restartCount <= 3){
				////console.warn('Auto Restart Mechinsm')
				////restart();
			//}
		//}
  })
  .catch(err => {
		console.log(scope, err)
	})
}

export const initiatewebRTC = (mode,rtsp,times)=>{
	return(dispatch,getState)=>{
		const pc = new RTCPeerConnection(configuration);
		let peerid = rtsp;
		let streamObj = {};

		pc.onicecandidate = (evt) => {
			if(evt.candidate){
				console.log('onicecandidate', evt.candidate);

				function fetchFunction(){
					fetchRequest(`/addIceCandidate1?peerid=${peerid}`, null, evt.candidate, null, null, 'onicecandidate',null,()=>fetchFunction);
				}
				
				fetchFunction();		

			} else {
				console.log('No / End of candidates')
			}
		}
		
		pc.onaddstream = (evt)=>{
			streamObj = { stream : evt.stream.toURL() , pc : pc , rtsp : rtsp };
		}

		pc.oniceconnectionstatechange = function(evt) {  
			// After Checking Status -> Settimeout to ensure it is connected , else restart the whole process
			// Garunteed it is connected to initiate game play
			if(pc.iceConnectionState === 'checking'){
				setTimeout(()=>{
					if(pc.iceConnectionState !== 'connected'){
						if(times <= 3){
							closeWebrtc(pc,rtsp);
							return dispatch(initiatewebRTC(mode,rtsp,times+1));
						}
					}
				},3000)
			}
			if(pc.iceConnectionState === 'connected'){
				dispatch({  
					type : 'STORE_WEBRTC_URL',
					keys : [mode],
					value :	streamObj
				});
			}
		}

		try {
			pc.createOffer(sessionDescription => {
				pc.setLocalDescription(sessionDescription, () => {
					fetchRequest(`/call?peerid=${peerid}&url=${encodeURIComponent(rtsp)}`, null, sessionDescription, onReceiveCall, null, 'setDesc', pc)
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
}

export const closeWebrtc = (pc,rtsp)=>{
	fetchRequest(`/hangup?peerid=${rtsp}`)
	if(pc && pc !== undefined) pc.close();
}

export const restartWebrtc = ()=>{
	return(dispatch,getState)=>{
		const mode = getState()['game']['play']['cameraMode'];
		if(getState()['game']['play']['webrtcUrl'][mode]){
			const { pc ,rtsp } = getState()['game']['play']['webrtcUrl'][mode];
			closeWebrtc(pc,rtsp);
			dispatch(initiatewebRTC(mode,rtsp,0));
		}
	}
}
