import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View , Easing,
         StyleSheet , Text , TouchableOpacity ,
         Dimensions , Platform, Animated, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../../components/telebuddies/telebot';
const height = Dimensions.get('window').height;
const coinsImg =  require('../../../../../assets/utilities/coins/telecoins_single.png')

class RewardedVideoListContainer extends Component{
  constructor(props){
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount(){
    this._animate()
  }

  _animate(){
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 600,
      easing : Easing.linear
    }).start(() => this._animate())
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
      <View style={[styles.container, styles.listWrapper]}>
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
              <Text style={styles.text}>Complete Watching Video</Text>
              <View style={styles.coinsRow}>
                <Image source={coinsImg} style={styles.image} resizeMode={'contain'}/>
                <Text style={styles.inlineText}>10</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Watch</Text>
            <Text style={styles.buttonText}>Now</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
              <Text style={styles.text}>Complete Watching Video</Text>
              <View style={styles.coinsRow}>
                <Image source={coinsImg} style={styles.image} resizeMode={'contain'}/>
                <Text style={styles.inlineText}>10</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Watch</Text>
            <Text style={styles.buttonText}>Now</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
  image : {
    width : 28,
    height : 28,
    marginRight : 10
  },
  coinsRow : {
    flexDirection : 'row',
    margin: 0
  },
  inlineText: {
    fontFamily : font,
    color : '#30D64A',
    fontSize : 25,
    marginTop: 6
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

export default connect(mapStateToProps,mapDispatchToProps)(RewardedVideoListContainer);






