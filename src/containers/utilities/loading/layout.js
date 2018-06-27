import React, { Component } from 'react';
import { Easing, Animated, View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

const loadClock = require('../../../../assets/utilities/sand_clock.png');

class Loading extends Component {
  constructor(props) {
    super(props);
    this.spinAnimation = new Animated.Value(0);
    this.state = {
      count: 30,
    };
  }
  componentDidMount() {
    Animated.loop(Animated.sequence([
      Animated.timing(
        this.spinAnimation,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
        },
      ),
      Animated.delay(500),
    ])).start();

    if (this.props.game) {
      this.countDown = setInterval(() => {
        this.setState({ count: this.state.count - 1 });
      }, 1000);
    }
  }

  shouldComponentUpdate(nextState) {
    return (nextState.count !== this.state.count);
  }

  componentWillUnmount() {
    if (this.props.game) {
      clearInterval(this.countDown);
    }
  }

  spin() {
    const spin = this.spinAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return {
      transform: [{ rotate: spin }],
    };
  }
  render() {
    const { string, game } = this.props;
    const { count } = this.state;
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.image, this.spin()]}
          source={loadClock}
          resizeMode="contain"
        />
        { game ? <Text style={styles.text}>{string.connecting}{' '}{count}</Text>
          : <Text style={styles.text}>{string.loading}</Text> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
  },
});

function mapStateToProps(state) {
  return {
    string: state.preference.language.string,
  };
}

export default connect(mapStateToProps, null)(Loading);
