import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

const testProductImage = require('../../../../../../assets/utilities/bear2.png');

class ProductImage extends Component {
  constructor() {
    super();
    this.animateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animation();
  }

  shouldComponentUpdate(nextProps) {
    const { images, status } = this.props;
    return images !== nextProps.images || status !== nextProps.status;
  }

  animation() {
    const swing = Animated.timing(
      this.animateValue,
      {
        toValue: 2,
        duration: 6000,
        useNativeDriver: true,
        delay: 0,
      },
    );

    Animated.loop(swing).start();
  }

  render() {
    const {
      status,
      id,
      onPressFunction,
      images,
    } = this.props;
    const rotate = this.animateValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['10deg', '-10deg', '10deg'],
    });
    return (
      <TouchableOpacity
        disabled={status.maintainStatus}
        onPress={() => onPressFunction(id, status.maintainStatus)}
      >
        <Animated.Image
          style={[styles.image, { transform: [{ rotate }] }]}
          source={(images && images.thumbnail) ? { uri: images.thumbnail } : testProductImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.4,
    height: width * 0.3,
  },
});

export default connect(null, null)(ProductImage);
