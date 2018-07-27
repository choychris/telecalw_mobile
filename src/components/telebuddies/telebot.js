import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

const telebotImages = {
  normal: require('../../../assets/telebuddies/telebot/telebot.png'),
  sick: require('../../../assets/telebuddies/telebot/telebot_sick.png'),
  setting: require('../../../assets/telebuddies/telebot/telebot_spanner.png'),
  happy: require('../../../assets/telebuddies/telebot/telebot_happy.png'),
  sad: require('../../../assets/telebuddies/telebot/telebot_sad.png'),
  money: require('../../../assets/telebuddies/telebot/telebot_money.png'),
  fly: require('../../../assets/telebuddies/telebot/telebot_fly.png'),
  postal: require('../../../assets/telebuddies/telebot/telebot_postal.png'),
  front: require('../../../assets/telebuddies/telebot/telebot_front.png'),
  settingMain: require('../../../assets/telebuddies/telebot/telebot_setting.png'),
};

class Telebot extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const {
      status, height, width, style,
    } = this.props;
    const imageStyle = { width, height };
    return (
      <Image
        source={telebotImages[status]}
        style={[imageStyle, style]}
        resizeMode="contain"
      />
    );
  }
}

export default connect(null, null)(Telebot);
