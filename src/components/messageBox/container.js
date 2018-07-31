import React, { Component } from 'react';
import {
  FlatList, View,
  Image, StyleSheet, Dimensions,
  Text, Platform,
} from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Prompt from './promopt';
import Buttons from './buttons';
import Tab from './tab';

const none = require('../../../assets/messagebox/none.png');
const left = require('../../../assets/messagebox/left.png');
const right = require('../../../assets/messagebox/right.png');

const messageBoxImage = {
  none,
  left,
  right,
};

const { height, width } = Dimensions.get('window');

class MessageBox extends Component {
  constructor(props) {
    super(props);
    const { tabs, selectedTab } = props;
    if (tabs) {
      if (selectedTab) {
        this.state = { selectedTab };
      } else {
        this.state = { selectedTab: 0 };
      }
    } else {
      this.state = { selectedTab: null };
    }
  }
  renderTabs(tabs) {
    const { string } = this.props;
    const { selectedTab } = this.state;
    return (
      <FlatList
        contentContainerStyle={styles.tabContent}
        horizontal
        data={tabs}
        renderItem={({ item, index }) =>
          <Tab
            string={string}
            index={index}
            {...item}
            selected={index === selectedTab}
            onPress={() => this.setState({ selectedTab: index })}
          />
        }
        extraData={selectedTab}
        keyExtractor={(item, index) => index}
      />
    );
  }
  render() {
    const {
      type,
      promptString,
      buttons,
      content,
      title,
      string,
      tabs,
    } = this.props;
    const { selectedTab } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={messageBoxImage[type]}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.innerView}>
          {(title) ? <Text style={styles.title}>{string[title]}</Text> : null}
          {(tabs) ? this.renderTabs(tabs) : null }
          {(promptString) ? <Prompt promptString={promptString} /> : null }
          {(content) || null }
          {(tabs && tabs[selectedTab] && tabs[selectedTab].content) ?
            tabs[selectedTab].content : null}
          {(buttons) ? <Buttons buttons={buttons} /> : null }
          {(tabs && tabs[selectedTab].buttons) ?
            <Buttons buttons={tabs[selectedTab].buttons} /> :
            <View style={{ padding: 24 }} /> }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.85,
    width: width * 0.92,
    marginVertical: 5,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: height * 0.75,
    opacity: 0.95,
  },
  innerView: {
    height: height * 0.70,
    borderRadius: 30,
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  title: {
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
});

function mapStateToProps(state) {
  return {
    string: state.preference.language.string,
  };
}

export default connect(mapStateToProps, null)(MessageBox);
