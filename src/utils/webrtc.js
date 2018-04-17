import WebRTC from 'react-native-webrtc';
import { Platform } from 'react-native';
const {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} = WebRTC;
const iceServers = [
  {
    urls: [
      "stun:stun.l.google.com:19302", 
      "stun:stun1.l.google.com:19302",
      "stun:stun2.l.google.com:19302"
    ]
  }
];

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
  //console.log(scope, data);
	//let url = `http://webrtcstreamer-env.ap-southeast-1.elasticbeanstalk.com${serverMethod}`
	//let url = `http://default-environment.25k6y4yfum.us-west-2.elasticbeanstalk.com${serverMethod}`
	//let url = `https://webrtc-streamer.herokuapp.com${serverMethod}`
	let url = serverMethod;
	//console.warn(url);
  fetch(url, init)
  .then(res => {
    if(res.status === 200 && onSuccess){
      //console.log(res._bodyText);
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

export const initiatewebRTC = (mode,rtsp,times,webrtcServerArray)=>{
	return(dispatch,getState)=>{

    const turnservers = getState()['game']['turnservers'];
    if(turnservers[0] !== undefined) iceServers = iceServers.concat(turnservers)
    const configuration = {iceServers: iceServers};
    let webrtcServer = (webrtcServerArray.length > 1) ? webrtcServerArray[times%webrtcServerArray.length] : webrtcServerArray[0] ;
    console.log(webrtcServer);
    const pc = new RTCPeerConnection(configuration);
		let peerid = rtsp;
		let streamObj = {};
		pc.onicecandidate = (evt) => {
			if(evt.candidate){
				//console.log('onicecandidate', evt.candidate);

				function fetchFunction(){
					fetchRequest(`${webrtcServer}/addIceCandidate?peerid=${peerid}`, null, evt.candidate, null, null, 'onicecandidate',null,()=>fetchFunction);
				}
				
				fetchFunction();		

			} else {
				console.log('No / End of candidates')
			}
		}

    dispatch({  
      type : 'CURRENT_WEBRTC_PC',
      value : {
        pcTemp: pc,
        serverTemp: webrtcServer
      }
    });
		
		pc.onaddstream = (evt)=>{
			streamObj = { 
				stream : evt.stream.toURL() , 
				pc : pc , 
				rtsp : rtsp ,
				webrtcServer : webrtcServer 
			};

      console.log('one stream added !')
		}

    let reTryTimeOut;
		pc.oniceconnectionstatechange = function(evt) {  
			// After Checking Status -> Settimeout to ensure it is connected , else restart the whole process
			// Garunteed it is connected to initiate game play
      console.log('evt oniceconnectionstatechange : ', evt.target.iceConnectionState);

			if(pc.iceConnectionState === 'connected'){
        clearTimeout(reTryTimeOut);
				dispatch({  
					type : 'STORE_WEBRTC_URL',
					keys : [mode],
					value :	streamObj
				});
			}
		};

    // retry mechanism for webRTC
    if(times < 3){
      const reTryTimeOut = setTimeout(()=>{
        if(pc.iceConnectionState !== 'connected'){
          closeWebrtc(pc,rtsp,webrtcServer);
          return dispatch(initiatewebRTC(mode,rtsp,times+1,webrtcServerArray));
        }
      },7000);
    };

    if(times === 3){
      const reTryTimeOut = setTimeout(()=>{
        if(pc.iceConnectionState !== 'connected'){
          closeWebrtc(pc,rtsp,webrtcServer);
        }
      },7000);
    };

		try {
			pc.createOffer(sessionDescription => {
				pc.setLocalDescription(sessionDescription, () => {
					fetchRequest(`${webrtcServer}/call?peerid=${peerid}&url=${encodeURIComponent(rtsp)}`, null, sessionDescription, onReceiveCall, null, 'setDesc', pc)
				} , err => console.log('setDesc', err))
			}, err => console.log('createOffer', err));
		
			const onReceiveCall = (data, pc) => {
				pc.setRemoteDescription(new RTCSessionDescription(data), () => {
					console.log("setRemoteDescription ok");
					fetchRequest(`${webrtcServer}/getIceCandidate?peerid=${peerid}`, null, null, onReceiveCandidate ,null , 'remoteDesc', pc)
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

export const closeWebrtc = (pc,rtsp,webrtcServer)=>{
	fetchRequest(`${webrtcServer}/hangup?peerid=${rtsp}`)
	if(pc && pc !== undefined) pc.close();
}

export const restartWebrtc = ()=>{
	return(dispatch,getState)=>{
		const mode = getState()['game']['play']['cameraMode'];
    const webrtcUrl = getState()['game']['play']['webrtcUrl'][mode];
		if(webrtcUrl !== undefined){
			const { pc ,rtsp , webrtcServer } = webrtcUrl;
			closeWebrtc(pc,rtsp,webrtcServer);
			dispatch(initiatewebRTC(mode,rtsp,0,[ webrtcServer ]));
		}
	}
}
