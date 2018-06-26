const Sound = require('react-native-sound');

export function playBackgroundMusic(gameId) {
  return (dispatch, getState) => {
    Sound.setCategory('Ambient');
    const soundPre = getState().preference.preference.sound;
    let background;
    let soundTrack;
    switch (gameId) {
      case 'A0001':
        soundTrack = 'HappyLoop.wav';
        break;
      default:
        soundTrack = 'background.mp3';
        break;
    }
    if (soundPre) {
      background = new Sound(soundTrack, Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          background.setVolume(0.05);
          background.setNumberOfLoops(-1);
          background.play();
        }
      });
    }
    return background;
  };
}

export function bananaGameSound(sound) {
  return (dispatch, getState) => {
    const soundPre = getState().preference.preference.sound;
    if (soundPre) {
      let soundTrack;
      switch (sound) {
        case 'count':
          soundTrack = 'count.m4a';
          break;
        case 'correct':
          soundTrack = 'correct.wav';
          break;
        case 'incorrect':
          soundTrack = 'incorrect.wav';
          break;
        case 'end':
          soundTrack = 'end.wav';
          break;
        default:
          break;
      }
      Sound.setCategory('Ambient');
      const soundObj = new Sound(soundTrack, Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          soundObj.setVolume(0.3);
          soundObj.play(() => {
            soundObj.release();
          });
        }
      });
    }
  };
}

export function playUISound(sound) {
  return (dispatch, getState) => {
    let soundPre = getState().preference.preference.sound;
    let soundObj;
    let soundTrack;
    switch (sound) {
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
      case 'fail':
        soundTrack = 'fail.mp3';
        break;
      case 'countDown':
        soundTrack = 'count_down.mp3';
        break;
      case 'start':
        soundTrack = 'start.wav';
        break;
      default:
        soundPre = false;
    }
    if (soundPre) {
      Sound.setCategory('Ambient');
      soundObj = new Sound(soundTrack, Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          soundObj.setVolume(0.4);
          soundObj.play(() => {
            soundObj.release();
          });
        }
      });
    }
    return soundObj;
  };
}
