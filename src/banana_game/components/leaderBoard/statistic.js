import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { displayTime } from '../../utils/displayTime';
import locale from '../../utils/i18n/language';

const emoji = require('node-emoji');

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = { timeLeft: null };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.timeLeft) {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
      }
    }, 1000);
  }

  // this works in newer version of react:
  // static getDerivedStateFromProps(props, state) {
  //   if (props.timeLeft !== state.timeLeft) {
  //     return { timeLeft: props.timeLeft };
  //   }
  //   return null;
  // }

  // this works in current version of react:
  componentWillReceiveProps(nextProps) {
    if (this.props.timeLeft !== nextProps.timeLeft) {
      this.setState({ timeLeft: nextProps.timeLeft });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { totalPlayer, weekly, lang } = this.props;
    const { timeLeft } = this.state;
    if (weekly) {
      return (
        <View style={styles.container}>
          <Text style={[styles.textStyle, { textAlign: 'center' }]}>
            {locale(lang, 'highScore') + emoji.get('star2')}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          { locale(lang, 'timeLeft') + displayTime(timeLeft) }
        </Text>
        <Text style={styles.textStyle}>
          { locale(lang, 'totalPlayer') + totalPlayer }
        </Text>
      </View>
    );
  }
}

export const Header = ({ lang }) =>
  (
    <View style={styles.container}>
      <Text style={[styles.textStyle, { textAlign: 'center' }]}>
        {locale(lang, 'congrats')}
      </Text>
      <Text style={[styles.textStyle, { textAlign: 'center' }]}>
        {`${emoji.get('tada')} ${emoji.get('tada')} ${emoji.get('tada')}`}
      </Text>
    </View>
  );


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingLeft: 4,
  },
  textStyle: {
    fontSize: 18,
    color: '#38CC38',
    fontFamily: 'PixelOperatorSC-Bold',
  },
});

export default Stats;
