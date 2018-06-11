import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

class SelectTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
    this.animatedValue = new Animated.Value(0);
    this.onTabPress = this.onTabPress.bind(this);
    this.moveUnderLine = this.moveUnderLine.bind(this);
  }

  onTabPress(index) {
    this.props.onTabPress(index);
    this.setState({ currentTab: index }, this.moveUnderLine);
  }

  moveUnderLine() {
    Animated.timing(
      this.animatedValue,
      {
        toValue: this.state.currentTab,
        duration: 200,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const {
      textStyle,
      underLineStyle,
      inputRange,
      outputRange,
      tabs,
    } = this.props;
    const { currentTab } = this.state;
    let translateX = this.animatedValue.interpolate({
      inputRange,
      outputRange,
    });
    if (tabs.length === 1) { translateX = 0; }
    return (
      <View style={styles.constainer}>
        <View style={styles.subContainer}>
          {tabs.map((each, index) => {
            const selectedStyle = (currentTab === index) ?
              { fontWeight: 'bold', fontSize: 15 } : null;
            return (
              <TouchableWithoutFeedback
                key={each}
                onPress={(() => { this.onTabPress(index); })}
              >
                <View style={styles.textWrapper}>
                  <Text style={[textStyle, selectedStyle]}>
                    {each}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <Animated.View style={[
            underLineStyle,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    alignSelf: 'stretch',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textWrapper: {
    flex: 1,
  },
});

export default SelectTab;
