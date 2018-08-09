import React, { Component } from 'react';
import {
  Animated,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const first = require('../../images/1stPlace.png');
const second = require('../../images/2ndPlace.png');
const third = require('../../images/3rdPlace.png');
const ticket = require('../../../../assets/utilities/ticket.png');

const rewards = [
  {
    image: first,
    word: 'Highest Score:',
    extra: 250,
    amt: 50,
  },
  {
    image: second,
    word: '1st Runner-up:',
    extra: 100,
    amt: 40,
  },
  {
    image: third,
    word: '2nd Runner-up:',
    extra: 50,
    amt: 30,
  },
];

const ticketCount = (amt, playerCount) => {
  if (!playerCount) return amt;
  const factor = Math.floor((50 + playerCount) / 50);
  const reward = amt * factor;
  return reward;
};

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.flipping = new Animated.Value(0);
    // props.playCount();
    console.log('render');
  }
  componentDidMount() {
    Animated.loop(Animated.timing(
      this.flipping,
      {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      },
    )).start();
  }
  shouldComponentUpdate(nextProps) {
    return this.props.playerCount !== nextProps.playerCount;
  }

  render() {
    const { playerCount } = this.props;
    const rotateY = this.flipping.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const array = new Array(3).fill();
    return (
      <View style={styles.constainer}>
        <Text style={styles.title}>Current Reward</Text>
        <View style={styles.ticketRow}>
          {
            array.map(() =>
              <Animated.Image
                key={Math.random()}
                source={ticket}
                style={[
                  styles.ticketImage,
                  {
                    transform: [{ rotateY }],
                  },
                ]}
              />)
          }
        </View>
        {
          rewards.map((reward) => {
            const bonus = (playerCount >= 50) ? reward.extra : 0;
            const amount = ticketCount(reward.amt, playerCount);
            return (
              <View key={reward.amt} style={styles.ticketRow}>
                <Image
                  source={reward.image}
                  style={styles.imageStyle}
                />
                <View style={{ flex: 5 }}>
                  <Text style={styles.text}>{reward.word}</Text>
                  <Text style={styles.text}>
                    { `${amount} \n+ ${bonus} Bonus` }
                  </Text>
                </View>
                <Image
                  source={ticket}
                  style={[styles.ticketImage, { flex: 1 }]}
                />
              </View>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    justifyContent: 'flex-start',
    // borderWidth: 1,
    alignItems: 'center',
    flex: 1,
  },
  ticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  imageStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    margin: 7,
    flex: 2,
  },
  ticketImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginVertical: 5,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: 'PixelOperator-Bold',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontFamily: 'PixelOperator-Bold',
  },
});

export default Rewards;
