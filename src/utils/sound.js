const Sound = require('react-native-sound');

export function playBackgroundMusic(){
	return(dispatch,getState)=>{
		Sound.setCategory('Ambient');
		const soundPre = getState()['preference']['preference']['sound'];
		let background;
		if(soundPre === true){
			background = new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
				if (!error) {
					background.setVolume(0.05);
					background.setNumberOfLoops(3);
					background.play();
				} 
			});
		}
		return background;
	}
};

export function playUISound(sound){
	return(dispatch,getState)=>{
		Sound.setCategory('Ambient');
		const soundPre = getState()['preference']['preference']['sound'];
		let soundObj;
		let soundTrack;
		switch(sound){
			case 'coins':
				soundTrack = 'coins_sound.mp3';
			break;
			case 'click1':
				soundTrack = 'click1.mp3';
			break;
			case 'click2':
				soundTrack = 'click2.mp3';
			break;
			case 'spaceship':
				soundTrack = 'spaceship.mp3';
			break;
			case 'talking':
				soundTrack = 'robot_talking.mp3';
			break;
			case 'cancel':
				soundTrack = 'cancel_error.mp3';
			break;
			case 'whoosh':
				soundTrack = 'whoosh.mp3';
			break;
			case 'happy':
				soundTrack = 'happy.mp3';
			break;
		};
		if(soundPre === true){
			soundObj = new Sound(soundTrack,Sound.MAIN_BUNDLE,(error)=>{
				if (!error) {
					soundObj.setVolume(0.8);
					soundObj.play((success) => {
						soundObj.release();
					});
				} 
			});	
		}
		return soundObj;
	}
}
