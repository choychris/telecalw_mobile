import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pusher from 'pusher-js/react-native';
Pusher.logToConsole = true;
var WebRTC = require('react-native-webrtc');
var {
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView
} = WebRTC;
var pusher = new Pusher('9b56ea1a95906eb6c683', {
	authEndpoint: 'http://192.168.1.174:5000/pusher/auth',
	cluster: 'ap1',
	encrypted: true
});
var configuration = {"iceServers": [{'url': 'stun:stun.services.mozilla.com'},{"url": "stun:stun.l.google.com:19302"}]};
var pc = new RTCPeerConnection(configuration);
var container;

export default class App extends React.Component {
	constructor(){
		super();
		this.state = { videoURL : null };
	}

	componentWillMount(){

		pc.onaddstream = gotRemoteStream;
		//iceChannel.bind('client-ice', function(data) {
			//console.warn('ice');
			//console.warn(data);
			//pc.addIceCandidate(new RTCIceCandidate(data.candidate));
		//})
		pc.onicecandidate = function (event) {
			if (event.candidate) {
				var iceChannel = pusher.subscribe('private-webrtcice');
				iceChannel.bind('pusher:subscription_succeeded',function(data){
					iceChannel.trigger('client-ice',event.candidate);
				})
			}		  
		};
		
		const setUrl = (event)=>{
			console.warn(JSON.stringify(event.stream));
			this.setState({ videoURL : event.stream.toURL()  })
		}	

		function gotRemoteStream(event) {
			//console.warn(JSON.stringify(event));
			console.warn('got remote stream');
			setUrl(event);
		}


		function gotDescription(description) {
			console.warn('got description');
			peerConnection.setLocalDescription(description, function () {
										    
			}, function() {console.log('set description error')});
		}


		function createAnswerError(error) {
			console.log(error);
		}

		var channel = pusher.subscribe('private-webrtc');
		channel.bind('client-video', function(data) {
			//console.warn(JSON.stringify(data));
			//var signal = data;
			//console.warn(signal.sdp);
			//pc.setRemoteDescription(
				//new RTCSessionDescription(signal), 
				//function() {
					//pc.createAnswer(gotDescription, createAnswerError);								            
				//}
			//);
			//
			


			pc.setRemoteDescription(new RTCSessionDescription(data))
				.then(()=>{
					console.warn('Set Remote Desc');
					pc.createAnswer().then((desc)=>{
						console.warn(JSON.stringify(desc));
						console.warn('Create Answer');
						pc.setLocalDescription(desc)
							.then(()=>{
								console.warn(pc.localDescription);
										channel.trigger('client-video',pc.localDescription);
							});
					})
				})

			//pc.setRemoteDescription(new RTCSessionDescription({ sdp : data.sdp }), function () {
				//console.warn('Here');
				//pc.createAnswer(function(desc) {
					//console.warn('createAnswer', desc);
						//pc.setLocalDescription(desc, function () {
							////console.log('setLocalDescription', pc.localDescription);
							////socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });																	
						//}, null);
				//}, null);
			//}, null);


		});
	}
  render() {
		console.warn(this.state.videoURL);
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
				<RTCView style={{ height : 300 , width : 400 ,backgroundColor : 'black'  }} streamURL={this.state.videoURL}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
