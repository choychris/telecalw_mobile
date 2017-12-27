import { webrtcUrl } from '../../../config/env';

// Hang Up Request
export function hangUpRequest(params,request){
	return new Promise((resolve,reject)=>{
		const { peerId } = params;
		request(webrtcUrl()+'/hangup?peerid='+peerId, 'GET')
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Call Request
export function callRequest(params,request){
	return new Promise((resolve,reject)=>{
		const { peerId , data } = params;
		request(webrtcUrl()+'/call?peerid='+peerId+'&url='+encodeURIComponent('rtsp://188773sc14.iask.in:554/live/sub'),'POST',data)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

const fetchRequest = (serverMethod,headers,data,onSuccess,onFailure,pc) => {
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
	//let url = `http://webrtcstreamer-env.ap-southeast-1.elasticbeanstalk.com${serverMethod}`
 	//let url = `https://webrtc-streamer.herokuapp.com${serverMethod}`
  fetch(`${webrtcUrl()}${serverMethod}`, init)
  .then(res => {
    if(res.status === 200 && onSuccess){
      console.log(res._bodyText);
      onSuccess(JSON.parse(res._bodyInit), pc);
    }
    //console.log(scope, res)
  })
  .catch(err => console.log(scope, err))
}


// On Ice Candidate Request
export function onIceCandidateRequest(params,request){
	return new Promise((resolve,reject)=>{
		const { peerId , data } = params;
		request(webrtcUrl()+'/addIceCandidate?peerid='+peerId, 'GET',data)
			.then((responseData)=> (responseData.error) ? reject(responseData.error) : resolve(responseData) )
			.catch((error)=>reject(error));	  
	});
}

// Add Candidates Request
export function addCandidateRequest(params,request){

}


// Get Candidate Request
export function getCandidateRequest(params,request){

}
