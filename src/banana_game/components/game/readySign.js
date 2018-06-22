import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, Animated } from 'react-native';
import { bananaGameSound } from '../../../utils/sound';

class ReadySgin extends Component {
  constructor(props) {
    super(props);
    this.state = { word: 'READY!' };
    this.props.sound('count');
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ word: 'GO!' }, this.animate);
    }, 1500);
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const bounce = this.animatedValue.interpolate({
      inputRange: [0, 0.2, 0.4, 0.43, 0.53, 0.7, 0.8, 0.9, 1],
      outputRange: [0, 0, -30, -30, 0, -15, 0, -4, 0],
    });
    this.props.sound('count');
    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.textStyle, { transform: [{ translateY: bounce }] }]}>
          {this.state.word}
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 60,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    sound: bananaGameSound,
  }, dispatch);
export default connect(null, mapDispatchToProps)(ReadySgin);
