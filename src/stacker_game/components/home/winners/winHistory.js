import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import emoji from 'node-emoji';
import ListItem from './listItem';
import Config from '../../../config/constants';

const gift = emoji.get('gift');
class WinHistory extends Component {
  componentDidMount() {
    // get winning data here
    this.props.getWinners();
  }

  winnerList() {
    const { winners } = this.props;
    if (!winners) {
      return <ActivityIndicator />;
    }
    if (winners.length === 0) {
      return <Text>No player history yet.</Text>;
    }
    return <FlatList
      data={winners}
      renderItem={({ item, index }) => (
        <ListItem
          id={item.key}
          index={index}
          name={item.name}
          wins={item.wins}
        />
      )}
    />;
  }

  render() {
    const { onClose } = this.props;
    return (
      <View style={styles.container}>
        <Icon
          name="times"
          size={22}
          color="black"
          style={styles.iconStyle}
          onPress={onClose}
        />
        <Text style={styles.headerStyle}>Winners of Today</Text>
        <View style={styles.section}>
          <Text
            style={styles.sectionText}
          >
            {`Win Win Win! Fantastic!\n${gift}${gift}${gift}${gift}`}
          </Text>
        </View>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            padding: 5,
          }}
        >
          { this.winnerList() }
        </View>
      </View>
    );
  }
}

const { width, height } = Config;
export const styles = StyleSheet.create({
  container: {
    ...Config.shadow,
    position: 'absolute',
    alignSelf: 'center',
    top: height / 12,
    left: width / 16,
    height: height * 0.7,
    width: width * (7 / 8),
    borderRadius: 15,
    backgroundColor: '#D8D8D8',
    justifyContent: 'flex-start',
  },
  iconStyle: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginRight: 8,
  },
  headerStyle: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  section: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    paddingVertical: 5,
  },
  sectionText: {
    color: 'yellow',
    textAlign: 'center',
  },
});

export default WinHistory;