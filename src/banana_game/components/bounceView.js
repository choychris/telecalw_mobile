import React, { Component } from 'react';
import { Animated } from 'react-native';

class BounceView extends Component {
  componentDidMount() {
    Animated.timing(
      this.props.bounceAnimate,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const bounce = this.props.bounceAnimate.interpolate({
      inputRange: [0, 0.2, 0.4, 0.43, 0.53, 0.7, 1],
      outputRange: [-600, 0, -30, -30, 0, -15, 0],
    });
    return (
      <Animated.View style={[
          { transform: [{ translateY: bounce }] },
          this.props.style,
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default BounceView;
