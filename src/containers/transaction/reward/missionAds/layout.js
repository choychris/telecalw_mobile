import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View , Easing,
         StyleSheet , Text , TouchableOpacity , AsyncStorage,
         Dimensions , Platform, Animated, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoAdList from './videoList';
import FlyUfo from './flyUfo';
import { AdMobRewarded } from 'react-native-admob';
import { videoReward } from '../../actions';
import request from '../../../../utils/fetch';
import { videoAdsReward } from '../../../../common/api/request/reward';
const height = Dimensions.get('window').height;

class RewardedVideoListContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      ready: false, 
      amount: null,
      firstFinish: false, 
      secondFinish: false,
      firstTimer: null,
      secondTimer: null
    };
    this._reset = this._reset.bind(this);
    this._renderCounter = this._renderCounter.bind(this);
    this.createTimer = this.createTimer.bind(this);
  }

  componentWillMount(){
    let data = {
      token : this.props.token,
      data : {
        method: 'get'
      }
    }
    videoAdsReward(data, request)
    .then(res=>{
      console.log(res);
    })
  }

  componentDidMount(){
    if(__DEV__)AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    
    AdMobRewarded.setAdUnitID('ca-app-pub-5094396211239311/8858858109');

    AdMobRewarded.addEventListener('rewarded',
      (reward) => {
        console.log('AdMobRewarded => rewarded', reward);
        this._reset();
      }
    );

    AdMobRewarded.addEventListener('adFailedToLoad',
      (error) => {
        console.log('adFailedToLoad', error)
        this.setState({ready: 'error'});
      }
    );

    AdMobRewarded.addEventListener('adLoaded',
      () => {
        console.log('AdMobRewarded => adLoaded')
        this.setState({ready: true});
      }
    );

    AdMobRewarded.addEventListener('adOpened',
      () => console.log('AdMobRewarded => adOpened')
    );

    AdMobRewarded.addEventListener('adClosed',
      () => {
        console.log('AdMobRewarded => adClosed')
      }
    );

    AdMobRewarded.requestAd().catch(error => console.warn('request error:', error));
    
    this.createTimer();
    this.timer = setInterval(()=>{
      if(this.state.firstTimer){
        this.setState({firstTimer: (this.state.firstTimer - 1000)})
      }
      if(this.state.secondTimer){
        this.setState({secondTimer: (this.state.secondTimer - 1000)})
      }
    }, 1000)
  }

  async createTimer(){
    const timeNow = new Date().getTime();
    try {
      const value1 = await AsyncStorage.getItem('firstAdAvaliable');
      const value2 = await AsyncStorage.getItem('secondAdAvaliable');

      if (value1 && timeNow <= parseInt(value1, 10)){
        console.log('value1', value1);
        const remainTime = parseInt(value1, 10) - timeNow;
        this.setState({firstTimer: remainTime})
      }

      if (value2 && timeNow <= parseInt(value2, 10)){
        console.log('value2', value2);
        const remainTime = parseInt(value2, 10) - timeNow;
        this.setState({secondTimer: remainTime})
      }

    } catch (error) {
      // Error retrieving data
    }
  }

  _reset(){
    const { videoReward, navigator } = this.props;
    const afterTwoHours = new Date().getTime() + 7200000;
    const NSTimeString = afterTwoHours.toString()
    if(!this.state.firstTimer){
      AdMobRewarded.requestAd().catch(error => console.warn('request error:', error));
      AsyncStorage.setItem('firstAdAvaliable', NSTimeString);
      this.setState({firstTimer: 7200000});
    }else{
      AsyncStorage.setItem('secondAdAvaliable', NSTimeString);
      this.setState({secondTimer: 7200000});
    }
    setTimeout(()=>rewardPrompt(navigator, this.state.amount), 2000)
  }

  _renderCounter(timeStamp){
    function displayTime(time){
    let h = Math.floor(time / 3600);
    let m = Math.floor(time % 3600 / 60);
    let s = Math.floor(time % 3600 % 60);
    let mdisplay = m >= 10 ? m : '0'+m;
    let sdisplay = s >= 10 ? s : '0'+s;
    return h + ':' + mdisplay + ':' + sdisplay; 
    }
    return (
      <View style={styles.adList}>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.text}>Next video available in</Text>
            <Text style={[styles.text, {textAlign:'center'}]}>
              {displayTime(timeStamp/1000)}
            </Text>
          </View>
          <FlyUfo/>
        </View>
      </View>
    )
  }

  componentWillUnmount(){
    AdMobRewarded.removeAllListeners();
    clearInterval(this.timer);
  }

  render(){
    let { ready, firstTimer, secondTimer } = this.state;
    return(
      <View style={[styles.container, styles.listWrapper]}>

      {firstTimer? this._renderCounter(firstTimer):<VideoAdList ready={ready} />}
      {secondTimer? this._renderCounter(secondTimer):<VideoAdList ready={ready} />}

      </View>
    )
  }
};

const font = (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold';
const styles = StyleSheet.create({
  container : {
    alignSelf : 'stretch',
    alignItems : 'center',
    justifyContent : 'center',
    paddingVertical : 30
  },
  listWrapper : {
    alignSelf : 'stretch',
    height : height * 0.4,
    marginBottom : height * 0.1
  },
  itemContainer: {
    flex: 1,
    flexDirection : 'row',
    alignSelf : 'stretch',
    alignItems : 'center',
    borderRadius : 10,
    backgroundColor : 'black',
    padding : 10
  },
  text : {
    fontFamily : font,
    color : '#30D64A',
    fontSize : 18,
    marginVertical : 2
  },
  adList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf : 'stretch',
    padding: 10,
    margin : 5
  }
})

function mapStateToProps(state) {
  return {
    string : state.preference.language.string,
    token: state.auth.token.lbToken.id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
  videoReward
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RewardedVideoListContainer);






