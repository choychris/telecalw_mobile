import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import Telebot from '../../../components/telebuddies/telebot';
import Teleufo from '../../../components/telebuddies/teleufo';
import Teletars from '../../../components/telebuddies/teletars';

const { height } = Dimensions.get('window');

class Characters extends Component {
  constructor(props) {
    super(props);
    this.telebot = new Animated.ValueXY();
    this.teleufo = new Animated.ValueXY();
    this.teletars = new Animated.ValueXY();
  }
  componentDidMount() {
    Animated.parallel([
      Animated.loop(Animated.sequence([
        Animated.timing(this.telebot, {
          duration: 1000,
          toValue: {
            x: 0,
            y: 30,
          },
          easing: Easing.linear,
        }),
        Animated.timing(this.telebot, {
          duration: 1000,
          toValue: {
            x: 0,
            y: 0,
          },
          easing: Easing.linear,
        }),
      ])),
      Animated.loop(Animated.sequence([
        Animated.delay(1000),
        Animated.timing(this.teleufo, {
          duration: 800,
          toValue: {
            x: 0,
            y: 25,
          },
          easing: Easing.linear,
        }),
        Animated.timing(this.teleufo, {
          duration: 800,
          toValue: {
            x: 0,
            y: 0,
          },
          easing: Easing.linear,
        }),
      ])),
      Animated.loop(Animated.sequence([
        Animated.timing(this.teletars, {
          duration: 1000,
          toValue: {
            x: 0,
            y: 20,
          },
          easing: Easing.linear,
        }),
        Animated.timing(this.teletars, {
          duration: 1000,
          toValue: {
            x: 0,
            y: 0,
          },
          easing: Easing.linear,
        }),
        Animated.delay(500),
      ])),
    ])
      .start();
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={this.telebot.getLayout()}>
          <Telebot
            status="front"
            width={100}
            height={100}
            style={{
              top: 10,
              transform: [{ rotate: '-15deg' }],
            }}
          />
        </Animated.View>
        <Animated.View style={this.teleufo.getLayout()}>
          <Teleufo
            status="normal"
            width={90}
            height={90}
            style={{
              top: -10,
            }}
          />
        </Animated.View>
        <Animated.View style={this.teletars.getLayout()}>
          <Teletars
            status="normal"
            width={120}
            height={120}
            style={{
              top: 30,
            }}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: height * 0.48,
  },
});

export default connect(null, null)(Characters);

