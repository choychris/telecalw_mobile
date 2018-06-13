import React, { Component } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ProductInfo from './product/info';
import ProductImage from './product/image';
// import Tube from './product/tube';

class ItemContainer extends Component {
  constructor() {
    super();
    this.animateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const {
      onPressFunction, name, status, gamePlayRate, id, images, top,
    } = this.props;
    const disableStyle = (status.maintainStatus === true) ? { opacity: 0.3 } : null;
    const alignSelf = top ? 'flex-end' : 'flex-start';
    return (status.visible === true) ? (
      <Animated.View style={[
        styles.container,
        disableStyle,
        { alignSelf, opacity: this.animateValue }]}
      >
        <ProductInfo
          id={id}
          name={name}
          status={status}
          gamePlayRate={gamePlayRate}
          onPressFunction={onPressFunction}
        />
        <ProductImage
          id={id}
          status={status}
          images={images}
          onPressFunction={onPressFunction}
        />
      </Animated.View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default connect(null, null)(ItemContainer);

