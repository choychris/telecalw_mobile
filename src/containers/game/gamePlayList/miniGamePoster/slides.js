import React, { PropTypes, Component } from 'react';
import { Animated , Easing , PanResponder , View , Platform ,
         Text , Image , ActivityIndicator, StyleSheet , 
         Dimensions , TouchableOpacity , StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../../../../components/utilities/buttons';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import NavBar from '../../../../components/navBar/container';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
let posters = [
  require('../../../../../assets/miniGame/poster1.png'),
  require('../../../../../assets/miniGame/poster2.png'),
  require('../../../../../assets/miniGame/poster3.png'),
  require('../../../../../assets/miniGame/poster4.png')
];

class Slides extends Component {
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={4} />;
  }

  _renderSlides(poster,i){
    return (
      <View key={i} style={styles.viewStyle}>
          <Image style={styles.imageStyle} resizeMode='contain' source={poster}/>
      </View>
    )
  }

  render(){
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <BackgroundImage type={'random'}/>
        <NavBar 
          back={true}
          coins={true} 
          navigator={navigator}
        />
        <IndicatorViewPager
          style={styles.pageStyle}
          indicator={this._renderDotIndicator()}
        >
          {posters.map((poster,i)=>this._renderSlides(poster,i))}
        </IndicatorViewPager>
        <View style={styles.buttonGroup}>
          <Button 
            textStyle={styles.buttonText}
            btnStyle={styles.btnStyle}
            text='Yay'
          />
          <Button 
            textStyle={styles.buttonText}
            btnStyle={styles.btnStyle}
            text='Nay'
          />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  pageStyle : {
    flex: 1
  },
  viewStyle : {
    flex : 1
  },
  imageStyle : {
    flex: 1,
    alignSelf : 'center',
    borderRadius: 20
  },
  buttonGroup : {
    flexDirection: 'row',
    padding : 5,
    alignItems : 'center',
    justifyContent:'center'
  },
  buttonText : {
    color : 'white',
    fontSize : 18,
    fontFamily : (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold'
  },
  btnStyle : {
    backgroundColor : 'rgba(52, 52, 52, 0.7)',
    opacity : 70,
    paddingVertical : 12,
    paddingHorizontal : 30,
    alignSelf : 'center'
  }
});

export default Slides;