import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
	TouchableOpacity
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
		{"url": "stun:stun.l.google.com:19302"}, 
		{'url': 'stun:stun.services.mozilla.com'}]
};
let restartCount = 0;


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
  //let url = `http://192.168.1.11:8000${serverMethod}`
	//let url = `http://ec2-13-229-110-40.ap-southeast-1.compute.amazonaws.com:8000${serverMethod}`
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
			//this._initiatewebRTC();
			if(res.status && res.status === 404 && restartCount <= 5){
				console.warn('Auto Restart Mechinsm')
					setTimeout(()=>{

					restart();
					restartCount ++
					}, 3000)
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
					fetchRequest(`/addIceCandidate?peerid=${peerid}`, null, evt.candidate, null, null, 'onicecandidate',null,()=>{  
							closeWebrtc(peerid,pc);
							return initiatewebRTC(userId,saveWebrtcUrl);
					})
				} else {
					console.log('No / End of candidates')
				}
			}

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
          console.log('candidate added:', each);
          pc.addIceCandidate(candidate, () => console.log("addIceCandidate OK"), err => console.log("addIceCandidate Error", err));
        })
      }
    }


    const getStream = (evt) => {
      console.log("Remote track added:", evt)
      if(evt.streams){
        //this.setState({url: evt.streams[0].toURL()})
				saveWebrtcUrl(evt.streams[0].toURL());
      } else {
				saveWebrtcUrl(evt.stream.toURL());
        //this.setState({url: evt.stream.toURL()})
      }
    }
    if (typeof pc.ontrack != "undefined") {
      pc.ontrack = (evt) => { getStream(evt) };
    } else {
      pc.onaddstream = (evt) => { getStream(evt) };
    }

		return pc;

	}

const closeWebrtc = (userId,pc)=>{
	if(pc){
		//console.warn(this.pc);
		fetchRequest(`/hangup?peerid=${userId}`)
		pc.close();
	}
}

class LiveView extends Component {
  constructor(props){
    super(props);
    this.state = {url: null};
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
		}, 15000);
	}
  componentDidMount(){
    console.warn('scope:', this.pc);
		const { userId ,saveWebrtcUrl } = this.props;
    //let pc = this.pc;
    let peerid = userId;
    //pc.oniceconnectionstatechange = (evt) => {
      //console.log('ICE Connection State Change', pc.iceConnectionState)
    //}
					setTimeout(()=>{
		this.pc = initiatewebRTC(userId,saveWebrtcUrl);
					},1000)
    // pc.ondatachannel = (evt) => {
    //   evt.channel.onopen = function () {
    //     console.log("remote datachannel open");
    //   }
    // }
    // let dataChannel = pc.createDataChannel("ClientDataChannel");
    // dataChannel.onopen = function() {
    //   console.log("local datachannel open");
    // }

    //setTimeout(() => {
      //if(this.pc){
        //console.warn(this.pc);
        //fetchRequest(`/hangup?peerid=${peerid}`)
				//this.pc.close();
      //} 
    //}, 20000)
  }

	 componentWillUnmount(){
		 const {	userId  } = this.props;
		 closeWebrtc(userId,this.pc);
	 }

  render() {
		const { webrtcUrl ,saveWebrtcUrl } = this.props;
    return (webrtcUrl !== null) ? 
			<View>
				<TouchableOpacity
					onPress={()=>{
						//clearTimeout(this.timeout)	

						const {	userId  } = this.props;
			 			closeWebrtc(userId,this.pc);
						this.pc = initiatewebRTC(userId,saveWebrtcUrl);

					}}
				>
					<Text>{'Restart'}</Text>
				</TouchableOpacity>
				<RTCView style={{width: 350, height: 500, backgroundColor : 'black'}} streamURL={webrtcUrl }/>
		  </View>	: null 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
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
