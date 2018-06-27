import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

const en = require('../../../../assets/logo/logo_en.png');
const zhHant = require('../../../../assets/logo/logo_zhHant.png');

const logos = {
  en,
  zhHant,
};

class Logo extends Component {
  constructor(props) {
    super(props);
    this.neon = new Animated.Value(0.5);
  }
  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.neon, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(this.neon, {
          toValue: 0.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.delay(100),
        Animated.timing(this.neon, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 3,
      },
    ).start();
  }
  shouldComponentUpdate(nextProps) {
    const { locale } = this.props;
    return locale !== nextProps.locale;
  }
  neonAction() {
    const neonEffect = this.neon.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return {
      opacity: neonEffect,
    };
  }
  render() {
    const { locale } = this.props;
    return (
      <Animated.Image
        source={logos[locale]}
        style={[styles.logo, this.neonAction()]}
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: 0,
    width: '86%',
    height: '30%',
  },
});

export default connect(null, null)(Logo);
