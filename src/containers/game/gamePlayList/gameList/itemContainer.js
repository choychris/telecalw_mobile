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
    const { maintainStatus } = this.props.status;
    if (maintainStatus) {
      this.animate(0.3);
    } else {
      this.animate(1);
    }
  }

  animate(value) {
    Animated.timing(
      this.animateValue,
      {
        toValue: value,
        duration: 500,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const {
      onPressFunction, name, status, gamePlayRate, id, images, top,
    } = this.props;
    const alignSelf = top ? 'flex-end' : 'flex-start';
    return (status.visible === true) ? (
      <Animated.View style={[
        styles.container,
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

