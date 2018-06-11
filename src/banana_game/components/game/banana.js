import React, { Component } from 'react';
import random from 'lodash/random';
import {
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GameAction from '../../actions/gameActions';
import Config from '../../utils/config';

const { toNextLevel } = GameAction;

const bananaLeft = require('../../images/bananaLeft.png');
const bananaRight = require('../../images/bananaRight.png');
const explode2 = require('../../images/explode2.png');

const { horizontalScale, verticalScale } = Config;

class Banana extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      visible: true,
    };
    this.rotate = random(-30, 30);
    this.onPressOut = this.onPressOut.bind(this);
    this.fadeInValue = new Animated.Value(0);
    this.shaky = new Animated.Value(0);
  }

  componentDidMount() {
    this.fadeIn();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  onPressOut() {
    if (this.state.pressed) { return; }
    const checkPressCorrect = () => this.props.numberList[0] === this.props.number;
    if (this.props.numberList.length === 1) {
      this.getScore();
      this.props.toNextLevel();
    } else if (checkPressCorrect()) {
      this.getScore();
    } else {
      this.shake();
    }
  }

  getScore() {
    this.fadeOut();
    this.props.getScore();
    this.setState({ pressed: true });
  }

  shake() {
    this.shaky.setValue(0);
    Animated.timing(
      this.shaky,
      {
        toValue: 1,
        duration: 400,
      },
    ).start();
    console.log('wrong');
  }

  fadeIn() {
    Animated.timing(
      this.fadeInValue,
      {
        toValue: 1,
        duration: 400,
      },
    ).start();
  }

  fadeOut() {
    Animated.timing(
      this.fadeInValue,
      {
        toValue: 0,
        duration: 400,
      },
    ).start(() => this.setState({ visible: false }));
  }

  render() {
    if (!this.state.visible) { return null; }
    const {
      imageWidth, bottomPosition, leftPosition, number,
    } = this.props;
    const width = horizontalScale(imageWidth);
    const height = verticalScale(imageWidth);
    const left = horizontalScale(leftPosition);
    const bottom = verticalScale(bottomPosition);
    const fontSize = verticalScale(imageWidth / 2.5);
    const scale = this.fadeInValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1.7, 1],
    });
    const origin = this.rotate;
    const shakeLeft = this.rotate - 15;
    const shakeRight = this.rotate + 15;
    const shakeRange = this.shaky.interpolate({
      inputRange: [0, 0.125, 0.375, 0.625, 0.875, 1],
      outputRange: [
        `${origin}deg`,
        `${shakeLeft}deg`,
        `${shakeRight}deg`,
        `${shakeLeft}deg`,
        `${shakeRight}deg`,
        `${origin}deg`,
      ],
    });
    return (
      <TouchableWithoutFeedback onPressOut={this.onPressOut}>
        <Animated.View
          style={{
            width,
            height,
            left,
            bottom,
            position: 'absolute',
            transform: [{ rotate: shakeRange }],
            opacity: this.fadeInValue,
          }}
        >
          <Image
            source={(leftPosition % 2 === 0) ? bananaRight : bananaLeft}
            style={[{ width }, styles.imageStyle]}
          />
          { (this.state.pressed) ?
            <Animated.Image
              source={explode2}
              style={[{ width, height: width, transform: [{ scale }] },
              styles.explodeImage]}
            /> : null
          }
          <Text style={[{ fontSize }, styles.textStyle]}>{number}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // transform: [{ rotate: '-50deg' }],
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textStyle: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'PixelOperatorSC-Bold',
  },
  explodeImage: {
    position: 'absolute',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  numberList: state.game.traceNumberList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    toNextLevel,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Banana);
