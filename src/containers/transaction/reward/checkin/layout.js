import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Telebot from '../../../../components/telebuddies/telebot';
import UpdatePrompt from './update';
import { playUISound } from '../../../../utils/sound';
import { vibrate } from '../../../../utils/vibrate';

const { height } = Dimensions.get('window');

const coinsImg = require('../../../../../assets/utilities/coins/telecoins_single.png');

class CheckinReward extends Component {
  constructor() {
    super();
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    const { playUISound, vibrate } = this.props;
    playUISound('happy');
    vibrate(500);
  }
  shouldComponentUpdate() {
    return false;
  }

  dismiss() {
    this.props.navigator.dismissLightBox();
  }

  render() {
    const { string, rewardAmount } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.dismiss}>
        <View style={styles.container}>
          <Text style={[styles.text, styles.title]}>
            {string.checkIn}
          </Text>
          <Telebot
            status="happy"
            width={180}
            height={180}
          />
          <Text style={[styles.text, styles.desc]}>
            {string.checkinReward}
          </Text>
          <View style={styles.innerContainer}>
            <Text style={[styles.text, styles.desc]}>
              {`${string.rewardAmount} : ${rewardAmount}`}
            </Text>
            <Image
              source={coinsImg}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <UpdatePrompt string={string.checkIn} />
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: height * 0.6,
      },
    }),
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
  },
  desc: {
    fontSize: 22,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    textAlign: 'center',
  },
  image: {
    marginTop: 10,
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    string: state.preference.language.string,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    playUISound,
    vibrate,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinReward);
