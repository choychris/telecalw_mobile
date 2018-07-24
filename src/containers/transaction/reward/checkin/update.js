import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import emoji from 'node-emoji';

const telebot = require('../../../../../assets/telebuddies/telebot/telebot.png');

const features = {
  eng: [
    `${emoji.get('rocket')} New mini game - STACKER`,
    `${emoji.get('admission_tickets')} Tickets - prizes can be exchanged for tickets.`,
    `${emoji.get('house')} Prize Center - use tickets to get your fav. prizes!`,
  ],
  zhHant: [
    `${emoji.get('rocket')} 新小遊戲 - STACKER`,
    `${emoji.get('admission_tickets')} 換領劵 - 獎品可以轉成換領劵`,
    `${emoji.get('house')} 禮物中心 - 使用換領劵來換取最喜歡的獎品吧!`,
  ],
};

const wording = {
  eng: {
    up: 'Upcomings :',
    better: 'We want to make Teleclaw better',
  },
  zhHant: {
    up: '即將加入 :',
    better: '我們希望做得更好',
  },
};

const UpdatePrompt = ({ string }) => {
  const pref = (string === 'Check In Reward') ? 'eng' : 'zhHant';
  return (
    <View style={styles.container}>
      <Text style={styles.para}>
        {wording[pref].better}
      </Text>
      <View style={styles.title}>
        <Image
          source={telebot}
          style={[
            styles.imageStyle,
            { transform: [{ scaleX: -1 }] },
          ]}
        />
        <Text style={styles.para}>{wording[pref].up}</Text>
        <Image
          source={telebot}
          style={styles.imageStyle}
        />
      </View>
      { features[pref].map((f, i) =>
        <Text
          key={i}
          style={styles.points}
        >
          {f}
        </Text>) }
    </View>
  );
};

const { width } = Dimensions.get('window');
const fontSize = width > 400 ? 14 : 12;
const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'white',
  },
  title: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  para: {
    margin: 10,
    color: 'white',
    textAlign: 'center',
  },
  points: {
    margin: 5,
    color: 'white',
    textAlign: 'left',
    fontSize,
  },
});

export default UpdatePrompt;

