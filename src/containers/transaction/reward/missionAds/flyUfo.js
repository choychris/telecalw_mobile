import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , 
         View , Text , Image , ActivityIndicator, 
         StyleSheet , Dimensions , TouchableOpacity , 
         tatusBar , Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const teleufo = require('../../../../../assets/telebuddies/teleufo/ufo.png');
const { height , width } = Dimensions.get('window');

class FlyUfo extends Component {
  constructor(props){
    super(props);
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount () {
    this.animate()
  }

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  render(){
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [20, 100, 20]
    })
    return (
      <Animated.Image
        source={teleufo}
        style={[styles.teleufo, {marginLeft: movingMargin}]}
        resizeMode="contain"
      />
    )
  }
}

const styles = StyleSheet.create({
  teleufo : {
    height : 40,
    width : 40
  }
});

export default FlyUfo;




