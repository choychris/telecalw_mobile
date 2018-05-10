import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , Platform ,
         View , Text , Image , ActivityIndicator, 
         StyleSheet , Dimensions , TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toSlides } from './actions';
const { height, width } = Dimensions.get('window');
const questionImage = require('../../../../../assets/miniGame/questionMark.png')
const tubeImage = require('../../../../../assets/utilities/tube.png');

const WithTouch = (Component, action) => (props) => {
  //const propsWithoutNav = {...props};
  // delete propsWithoutNav.navigator
  return (
    <TouchableOpacity 
      style={props.touchStyle}
      onPress={()=>action(props.navigator)}
    >
      <Component {...props}/>
    </TouchableOpacity>
  )
};

const TouchImage = WithTouch(Image, toSlides);

class Poster extends Component {
  constructor(props){
    super(props)
    this._AnimatedPosition = new Animated.ValueXY();
  }

  componentWillMount(){
    Animated.spring(this._AnimatedPosition,{
      toValue : { x : width / 3 - 10  , y : height * 0.46 }
    }).start();
  }

  render(){
    const{ navigator } = this.props;
    return (
      <Animated.View style={[{ position : 'absolute' }, this._AnimatedPosition.getLayout()]}>
        <TouchableOpacity
          style={styles.container}
          onPress={()=>toSlides(navigator)}
        >
          <Text style={styles.text}>Need Your Help!</Text>
          <TouchImage 
            style={styles.imageStyleTube}
            touchStyle={styles.tubeImageContainer}
            source={tubeImage}
            resizeMode={'contain'}
            navigator={navigator}
          />
          <TouchImage 
            style={styles.imageStyle}
            touchStyle={styles.imageContainer}
            source={questionImage}
            resizeMode={'contain'}
            navigator={navigator}
          />
        </TouchableOpacity>
      </Animated.View>
    )
  }
};

const styles = StyleSheet.create({
  container : {
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'transparent'
  },
  imageStyle : {
    width: width * 0.12,
    height: height * 0.12
  },
  imageContainer : {
    top : height * 0.1,
    position : 'absolute'
  },
  imageStyleTube : {
    width : width * 0.4,
    height : width * 0.4
  },
  tubeImageContainer : {
    //top : height * -0.05
  },
  text : {
    fontSize : 15,
    color : 'white',
    fontFamily : 'PixelOperator-Bold',
    top : height * 0.2 * 0.15
  }
});

export default connect()(Poster);