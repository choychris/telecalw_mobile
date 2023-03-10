import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  // Dimensions,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdMobRewarded } from 'react-native-admob';
import VideoAdList from './videoList';
import FlyUfo from './flyUfo';
import { videoRewardPrompt } from '../../actions';
import request from '../../../../utils/fetch';
import { videoAdsReward } from '../../../../common/api/request/reward';

// const { height } = Dimensions.get('window');
const videoAdUnit = (Platform.OS === 'ios') ? 'ca-app-pub-5094396211239311/8858858109' : 'ca-app-pub-5094396211239311/6761585487';
class RewardedVideoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      amount: null,
      // firstFinish: false,
      // secondFinish: false,
      firstTimer: null,
      secondTimer: null,
    };
    this._reset = this._reset.bind(this);
    this._renderCounter = this._renderCounter.bind(this);
    this.createTimer = this.createTimer.bind(this);
  }

  componentWillMount() {
    const data = {
      token: this.props.token,
      data: {
        method: 'get',
      },
    };
    videoAdsReward(data, request)
      .then((res) => {
        this.setState({ amount: res.response.amount });
      });
  }

  componentDidMount() {
    if (__DEV__)AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);

    AdMobRewarded.setAdUnitID(videoAdUnit);

    AdMobRewarded.addEventListener(
      'rewarded',
      (reward) => {
        console.log('AdMobRewarded => rewarded', reward);
        this._reset();
      },
    );

    AdMobRewarded.addEventListener(
      'adFailedToLoad',
      (error) => {
        console.log('adFailedToLoad', error);
        this.setState({ ready: 'error' });
      },
    );

    AdMobRewarded.addEventListener(
      'adLoaded',
      () => {
        console.log('AdMobRewarded => adLoaded');
        this.setState({ ready: true });
      },
    );

    AdMobRewarded.addEventListener(
      'adOpened',
      () => console.log('AdMobRewarded => adOpened'),
    );

    AdMobRewarded.addEventListener(
      'adClosed',
      () => {
        console.log('AdMobRewarded => adClosed');
      },
    );

    AdMobRewarded.requestAd().catch((error) => {
      console.log(error);
      this.setState({ ready: true });
    });

    this.createTimer();
    this.timer = setInterval(() => {
      if (this.state.firstTimer) {
        this.setState({ firstTimer: (this.state.firstTimer - 1000) });
      }
      if (this.state.secondTimer) {
        this.setState({ secondTimer: (this.state.secondTimer - 1000) });
      }
    }, 1000);
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
    clearInterval(this.timer);
  }

  _reset() {
    const { videoRewardPrompt, navigator } = this.props;
    const afterTwoHours = new Date().getTime() + 3200000;
    const NSTimeString = afterTwoHours.toString();
    if (!this.state.firstTimer) {
      AdMobRewarded.requestAd().catch(error => console.warn('request error:', error));
      AsyncStorage.setItem('firstAdAvaliable', NSTimeString);
      this.setState({ firstTimer: 3200000 });
    } else {
      AsyncStorage.setItem('secondAdAvaliable', NSTimeString);
      this.setState({ secondTimer: 3200000 });
    }
    videoRewardPrompt(navigator, this.state.amount);
  }

  _renderCounter(timeStamp, word) {
    function displayTime(time) {
      const h = Math.floor(time / 3600);
      const m = Math.floor(time % 3600 / 60);
      const s = Math.floor(time % 3600 % 60);
      const mDisplay = m >= 10 ? m : `0${m}`;
      const sDisplay = s >= 10 ? s : `0${s}`;
      return `${h}:${mDisplay}:${sDisplay}`;
    }
    return (
      <View style={styles.adList}>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.text}>{word}</Text>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {displayTime(timeStamp / 1000)}
            </Text>
          </View>
          <FlyUfo />
        </View>
      </View>
    );
  }

  async createTimer() {
    const timeNow = new Date().getTime();
    try {
      const value1 = await AsyncStorage.getItem('firstAdAvaliable');
      const value2 = await AsyncStorage.getItem('secondAdAvaliable');

      if (value1 && timeNow <= parseInt(value1, 10)) {
        console.log('value1', value1);
        const remainTime = parseInt(value1, 10) - timeNow;
        this.setState({ firstTimer: remainTime });
      }

      if (value2 && timeNow <= parseInt(value2, 10)) {
        console.log('value2', value2);
        const remainTime = parseInt(value2, 10) - timeNow;
        this.setState({ secondTimer: remainTime });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    const {
      ready, amount, firstTimer, secondTimer,
    } = this.state;
    const { string } = this.props;
    return (
      <View style={styles.container}>

        {firstTimer ? this._renderCounter(firstTimer, string.nextVideo) : <VideoAdList ready={ready} amount={amount} />}
        {secondTimer ? this._renderCounter(secondTimer, string.nextVideo) : <VideoAdList ready={ready} amount={amount} />}

      </View>
    );
  }
}

const font = (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold';
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    flex: 5,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
  },
  text: {
    fontFamily: font,
    color: '#30D64A',
    fontSize: 18,
    marginVertical: 2,
  },
  adList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    padding: 10,
    margin: 5,
  },
});

function mapStateToProps(state) {
  return {
    string: state.preference.language.string,
    token: state.auth.token.lbToken.id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    videoRewardPrompt,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardedVideoListContainer);

