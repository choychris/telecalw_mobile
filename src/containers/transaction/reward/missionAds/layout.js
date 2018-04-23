import React, { PropTypes, Component } from 'react';
import { ActivityIndicator , ListView , View , Easing,
         StyleSheet , Text , TouchableOpacity , 
         Dimensions , Platform, Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../../components/telebuddies/telebot';
const height = Dimensions.get('window').height;

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
      duration: 2000,
      easing : Easing.linear
    }).start(() => this._animate())
  }

  render(){
    const size = this.animatedValue.interpolate({
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
            height={height * 0.14} 
            width={height * 0.14}
          />
        </Animated.View>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container : {
    alignSelf : 'stretch',
    alignItems : 'center',
    justifyContent : 'center',
    paddingVertical : 50
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






