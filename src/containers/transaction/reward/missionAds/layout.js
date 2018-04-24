import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View , Easing,
         StyleSheet , Text , TouchableOpacity , AsyncStorage,
         Dimensions , Platform, Animated, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoAdList from './videoList';
import { AdMobRewarded } from 'react-native-admob';
import { videoReward } from '../../actions';
const height = Dimensions.get('window').height;

class RewardedVideoListContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      ready: false, 
      firstFinish: false, 
      secondFinish: false,
      firstTimer: null,
      secondTimer: null
    };
    this._AdReady = this._AdReady.bind(this);
    this._reset = this._reset.bind(this);
  }

  componentWillMount(){
    AsyncStorage.getItem('firstAdAvaliable', (err, res)=>{
      if(res && new Date().getTime() <= parseInt(res, 10)){
        this.setState({
          firstTimer: parseInt(res, 10),
          firstFinish: true
        })
      }
    });

    AsyncStorage.getItem('secondAdAvaliable', (err, res)=>{
      if(res && new Date().getTime() <= parseInt(res, 10)){
        this.setState({
          secondTimer: parseInt(res, 10),
          secondFinish: true
        })
      }
    });
  }

  componentDidMount(){
    if(__DEV__)AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    
    AdMobRewarded.setAdUnitID('ca-app-pub-5094396211239311/8858858109');

    AdMobRewarded.addEventListener('rewarded',
      (reward) => console.log('AdMobRewarded => rewarded', reward)
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
        this._reset();
      }
    );

    AdMobRewarded.requestAd().catch(error => console.warn('request error:', error));
    AdMobRewarded.isReady(this._AdReady)
  }

  _reset(){
    const { videoReward, navigator } = this.props;
    const afterTwoHours = new Date().getTime() + 7200000;
    const NSTimeString = afterTwoHours.toString()
    if(!this.state.firstFinish){
      AdMobRewarded.requestAd().catch(error => console.warn('request error:', error));
      AsyncStorage.setItem('firstAdAvaliable', NSTimeString);
      this.setState({firstFinish: true});
    }else{
      AsyncStorage.setItem('secondAdAvaliable', NSTimeString);
      this.setState({secondFinish: true});
    }
    setTimeout(()=>videoReward(navigator), 1000)
  }

  _AdReady(boo){
    this.setState({adReady: boo})
    console.log('ready', boo)
  }

  componentWillUnmount(){
    AdMobRewarded.removeAllListeners();
  }

  render(){
    let { ready, firstFinish } = this.state;
    return(
      <View style={[styles.container, styles.listWrapper]}>
        <Text>{firstFinish? 'Yes':'No'}</Text>
        <VideoAdList ready={ready} />
        <VideoAdList ready={ready} />
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
  }
})

function mapStateToProps(state) {
  return {
    string : state.preference.language.string
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
  videoReward
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RewardedVideoListContainer);






