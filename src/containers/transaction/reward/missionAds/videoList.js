import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View , Easing,
         StyleSheet , Text , TouchableOpacity ,
         Dimensions , Platform, Animated, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdMobRewarded } from 'react-native-admob';
import Telebot from '../../../../components/telebuddies/telebot';
const height = Dimensions.get('window').height;
const coinsImg =  require('../../../../../assets/utilities/coins/telecoins_single.png')

class VideoAdList extends Component{
  constructor(props){
    super(props);
    this.animatedValue = new Animated.Value(0);
    this._showAd = this._showAd.bind(this);
    this._renderButton = this._renderButton.bind(this);
    this.state = {
      ready: this.props.ready
    }
  }

  componentDidMount(){
    this._animate()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.ready){
      this.setState({ready: true});
    }
  }

  _showAd(){
    AdMobRewarded.showAd().catch(error => console.warn(error));
  }

  _animate(){
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 600,
      easing : Easing.linear
    }).start(() => this._animate())
  }

  _renderButton(){
    const { ready } = this.state;
    if(ready === true){
      return (    
        <TouchableOpacity disabled={!ready} style={styles.button} onPress={this._showAd}>
          <Text style={styles.buttonText}>Watch</Text>
          <Text style={styles.buttonText}>Now</Text>
        </TouchableOpacity>
      )
    }else if(ready === false){
      return <Text style={styles.text}>Searching ..</Text>
    }else{
      return <Text style={styles.text}>No Ads ..</Text>
    }
  }

  render(){
    const size = this.animatedValue.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [0, 1, 0.8]
    })

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    return(
        <View style={styles.adList}>
          <Animated.View 
            style={{ transform: [{scale: size}] }}>
            <Telebot 
              status={'money'} 
              height={height * 0.08} 
              width={height * 0.08}
            />
          </Animated.View>
          <Animated.View style={[styles.itemContainer, {opacity}]}>
            <View style={{flex: 3}}>
              <Text style={styles.text}>Complete Watching</Text>
              <Text style={styles.text}>an Ads Video</Text>
              <View style={styles.coinsRow}>
                <Image source={coinsImg} style={styles.image} resizeMode={'contain'}/>
                <Text style={styles.inlineText}>10</Text>
              </View>
            </View>
            { this._renderButton() }
          </Animated.View>
        </View>
    )
  }
};

const font = (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold';
const styles = StyleSheet.create({
  adList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf : 'stretch',
    padding: 10,
    margin : 5
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
  inlineText: {
    fontFamily : font,
    color : '#30D64A',
    fontSize : 25,
    marginTop: 6
  },
  image : {
    width : 28,
    height : 28,
    marginRight : 10
  },
  coinsRow : {
    flexDirection : 'row',
    margin: 0
  },
  button: {
    flex: 1,
    backgroundColor : '#5AA1AD',
    borderRadius : 150,
    alignItems : 'center',
    paddingVertical: 16
  },
  buttonText: {
    color : 'white',
    fontFamily : font,
    fontSize: 14
  }
})

function mapStateToProps(state) {
  return {
    string : state.preference.language.string
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoAdList);






