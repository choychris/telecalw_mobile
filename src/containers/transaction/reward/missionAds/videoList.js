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
    if(!!nextProps.ready){
      this.setState({ready: nextProps.ready});
    }
  }

  _showAd(){
    AdMobRewarded.showAd().catch(error => console.log(error));
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
    const { string } = this.props;
    if(ready === true){
      return (    
        <TouchableOpacity disabled={!ready} style={styles.button} onPress={this._showAd}>
          <Text style={styles.buttonText}>{string['watchNow']}</Text>
        </TouchableOpacity>
      )
    }else if(ready === false){
      return <Text style={styles.text}>{string['loading']}</Text>
    }else{
      return <Text style={styles.text}>{string['noAds']}</Text>
    }
  }

  render(){
    const size = this.animatedValue.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [0, 1.1, 1]
    })

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })
    const { string } = this.props;

    return(
        <View style={styles.adList}>
          <Animated.View style={[styles.itemContainer, { transform: [{scale: size}] }]}>
            <View style={{flex: 1, margin: 5}}>
              <Telebot 
                status={'money'} 
                height={height * 0.07} 
                width={height * 0.07}
              />
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.text}>{string['adInstruction']}</Text>
              <View style={styles.coinsRow}>
                <Image source={coinsImg} style={styles.image} resizeMode={'contain'}/>
                <Text style={styles.inlineText}>{this.props.amount}</Text>
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
    borderRadius : 10,
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

export default connect(mapStateToProps,null)(VideoAdList);






