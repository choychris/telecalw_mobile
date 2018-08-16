import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import Row from '../components/playGround/row';
import Config, { rowNum, borderWidth } from '../config/constants';

const {
  playHeight, playWidth, boxSize, margin,
} = Config;
const rows = new Array(rowNum).fill();

class Playground extends Component {
  constructor() {
    super();
    this.animate = new Animated.ValueXY({ x: margin / 2, y: 0 });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.gameStarted) {
      this.startAnimate(0, 0);
    }
    if (!nextProps.gameStarted) {
      this.startAnimate(margin / 2, 0);
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.gameStarted !== this.props.gameStarted;
  }

  startAnimate(x, y) {
    const moveX = Animated.timing(
      this.animate.x,
      {
        toValue: x,
        duration: 400,
        useNativeDriver: true,
      },
    );
    const moveY = Animated.timing(
      this.animate.y,
      {
        toValue: y,
        duration: 400,
        useNativeDriver: true,
      },
    );
    Animated.sequence([moveY, moveX]).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: this.animate.getTranslateTransform() },
        ]}
      >
        <View style={[styles.playView, { position: 'absolute' }]} />
        {
          rows.map((each, i) => <Row
            rowIndex={i + 1}
            boxSize={boxSize}
            key={Math.random()}
            start={this.props.gameStarted}
          />)
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  playView: {
    justifyContent: 'flex-end',
    height: playHeight,
    width: playWidth,
    margin: 3,
    borderColor: '#D8D8D8',
    borderWidth,
    borderRadius: 3,
  },
});

export default Playground;
