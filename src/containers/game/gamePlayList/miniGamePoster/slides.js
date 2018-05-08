import React, { PropTypes, Component } from 'react';
import { View , Platform , Image, StyleSheet , 
         StatusBar, AsyncStorage, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../../../../components/utilities/buttons';
import BackgroundImage from '../../../../components/utilities/backgroundImage';
import NavBar from '../../../../components/navBar/container';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { vote } from './actions';
let posters = [
  require('../../../../../assets/miniGame/poster1.png'),
  require('../../../../../assets/miniGame/poster2.png'),
  require('../../../../../assets/miniGame/poster3.png'),
  require('../../../../../assets/miniGame/poster4.png')
];

class Slides extends Component {
  constructor(){
    super();
    this.state = {voted:null}
    this._renderDotIndicator = this._renderDotIndicator.bind(this);
    this._renderSlides = this._renderSlides.bind(this);
    this.getStorageItem = this.getStorageItem.bind(this);
    this.votePress = this.votePress.bind(this);
  }

  componentDidMount(){
    this.getStorageItem()
  }

  async getStorageItem(){
    try {
      const value = await AsyncStorage.getItem('voted');
      if (value !== null){
        this.setState({voted: true})
      }
    } catch (error) {
      // Error retrieving data
    }
  }

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

  _renderVoteButton(){
    return (
      <View style={styles.buttonGroup}>
        <Button 
          textStyle={styles.buttonText}
          btnStyle={styles.btnStyle}
          text='Yay'
          onPressFunction={()=>this.votePress(true)}
        />
        <View style={{margin: 20}}></View>
        <Button 
          textStyle={styles.buttonText}
          btnStyle={styles.btnStyle}
          text='Nay'
          onPressFunction={()=>this.votePress(false)}
        />
      </View>
    )
  }

  votePress(res){
    vote(res);
    AsyncStorage.setItem('voted', 'True');
    this.setState({voted: true})
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
        {this.state.voted ? 
          <Text style={styles.textStyle}>
            Thank you for your vote !
          </Text> : this._renderVoteButton()}
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
  },
  textStyle : {
    backgroundColor : 'transparent',
    textAlign : 'center',
    color : 'white',
    padding: 10
  }
});

export default Slides;