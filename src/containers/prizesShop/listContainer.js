import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import PrizeItem from './itemContainer';

const PrizeList = ({ prizes }) =>
  <View style={styles.container}>
    <FlatList
      data={prizes}
      numColumns={2}
      keyExtractor={item => item.name.en}
      renderItem={({ item }) =>
        <PrizeItem
          {...item}
        />
      }
    />
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

export default PrizeList;
