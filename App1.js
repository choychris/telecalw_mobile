import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
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

const fetchRequest = (serverMethod,headers,data,onSuccess,onFailure,scope, pc) => {
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
	//let url = `http://webrtcstreamer-env.ap-southeast-1.elasticbeanstalk.com${serverMethod}`
  //let url = `http://192.168.1.11:8000${serverMethod}`
	//let url = `http://ec2-13-229-110-40.ap-southeast-1.compute.amazonaws.com:8000${serverMethod}`
 	let url = `https://webrtc-streamer.herokuapp.com${serverMethod}`
  console.log(url);
  fetch(url, init)
  .then(res => {
    if(res.status === 200 && onSuccess){
      console.log(res._bodyText);
      onSuccess(JSON.parse(res._bodyInit), pc);
    }
    console.log(scope, res)
  })
  .catch(err => console.log(scope, err))
}

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}, {'url': 'stun:stun.services.mozilla.com'}]};
// const pcOptions = { 'optional': [{'DtlsSrtpKeyAgreement': true} ] };
// {"url": "turn:numb.viagenie.ca", credential: "chrischoy123", username: "chrischoy@kios.tech"}, 

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {url: null};
    this.pc = new RTCPeerConnection(configuration);
  }

  componentWillMount(){
    //
  }

  componentDidMount(){
    console.warn('scope:', this.pc);
    let pc = this.pc;
    let peerid = 'test123'
    pc.onicecandidate = (evt) => {
      if(evt.candidate){
        console.log('onicecandidate', evt.candidate);
        fetchRequest(`/addIceCandidate?peerid=${peerid}`, null, evt.candidate, null, null, 'onicecandidate')
      } else {
        console.log('No / End of candidates')
      }
    }
    const getStream = (evt) => {
      console.log("Remote track added:", evt)
      if(evt.streams){
        this.setState({url: evt.streams[0].toURL()})
      } else {
        this.setState({url: evt.stream.toURL()})
      }
    }
    if (typeof pc.ontrack != "undefined") {
      pc.ontrack = (evt) => { getStream(evt) };
    } else {
      pc.onaddstream = (evt) => { getStream(evt) };
    }
    pc.oniceconnectionstatechange = (evt) => {
      console.log('ICE Connection State Change', pc.iceConnectionState)
    }
    // pc.ondatachannel = (evt) => {
    //   evt.channel.onopen = function () {
    //     console.log("remote datachannel open");
    //   }
    // }
    // let dataChannel = pc.createDataChannel("ClientDataChannel");
    // dataChannel.onopen = function() {
    //   console.log("local datachannel open");
    // }
    pc.createOffer(sessionDescription => {
      pc.setLocalDescription(sessionDescription, () => {
        fetchRequest(`/call?peerid=${peerid}&url=${encodeURIComponent('rtsp://188773sc14.iask.in:554/live/main')}`, null, sessionDescription, onReceiveCall, null, 'setDesc', pc)
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

    setTimeout(() => {
      if(this.pc){
        console.warn(this.pc);
        fetchRequest(`/hangup?peerid=${peerid}`)
				this.pc.close();
      } 
    }, 4000000)
  }

  // componentWillUnmount(){
  //   let peerid = 'test123'
  //   if(this.pc){
  //     console.warn(this.pc);
  //     fetchRequest(`/hangup?peerid=${peerid}`)
  //     this.pc.close();
  //   } 
  // }

  render() {

    return (
      <View style={styles.container}>
      { (this.state.url !== null) ? <RTCView style={{width: 350, height: 350, backgroundColor : 'black'}} streamURL={this.state.url}/> : null }
        <Text style={styles.welcome}>
          Welcome to React Native!
          { this.state.url }
        </Text>
        <Text style={styles.instructions}>
          Testing React Native Webrtc
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
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
