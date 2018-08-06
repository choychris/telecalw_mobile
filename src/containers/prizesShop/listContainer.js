import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import PrizeItem from './itemContainer';

class PrizeList extends Component {
  constructor() {
    super();
    this.animate = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(
      this.animate,
      {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const { prizes, buy, navigator } = this.props;
    return (
      <View style={[styles.container, { opacity: this.animate }]}>
        <FlatList
          data={prizes}
          columnWrapperStyle={{ flex: 1 }}
          numColumns={2}
          keyExtractor={item => item.name.en}
          renderItem={({ item }) =>
            <PrizeItem
              {...item}
              buy={buy}
              navigator={navigator}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default PrizeList;
