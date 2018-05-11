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
    const position = { x : 0 , y : height * 0.04 }
    const { x, y } = position;
    Animated.spring(this._AnimatedPosition,{
      toValue : { x : x , y : y }
    }).start();
  }

  render(){
    const{ navigator } = this.props;
    let absoluteStyle = Platform.OS === 'ios' ? {} : { position : 'absolute' };
    return (
      <Animated.View style={[absoluteStyle, this._AnimatedPosition.getLayout()]}>
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

const font = (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold';
const styles = StyleSheet.create({
  container : {
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'transparent'
  },
  imageStyle : {
    width: width * 0.1,
    height: height * 0.1
  },
  imageContainer : {
    top : height * 0.1,
    position : 'absolute'
  },
  imageStyleTube : {
    width : width * 0.45,
    height : width * 0.45
  },
  tubeImageContainer : {
    top : height * 0.01,
    position : 'absolute'
  },
  text : {
    fontSize : 15,
    color : 'white',
    fontFamily : font,
    position : 'absolute',
    paddingTop: height * 0.45 * 0.15
  }
});

export default connect()(Poster);