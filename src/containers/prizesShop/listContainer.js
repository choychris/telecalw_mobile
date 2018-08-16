import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import PrizeItem from './itemContainer';
import PrizeDetails from './details';

class PrizeList extends Component {
  constructor() {
    super();
    this.state = {
      details: null,
    };
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

  // shouldComponentUpdate(nextProps) {
  //   return this.props.prizes !== nextProps.prizes;
  // }
  render() {
    const {
      prizes, buy, locale, showDetails, translateX,
    } = this.props;
    const { details } = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: this.animate,
            transform: [{ translateX }],
          },
        ]}
      >
        <FlatList
          data={prizes}
          columnWrapperStyle={{ flex: 1 }}
          numColumns={2}
          keyExtractor={item => item.name.en}
          renderItem={({ item, index }) =>
            <PrizeItem
              {...item}
              buy={buy}
              locale={locale}
              showDetails={() => showDetails(index)}
            />
          }
        />
        { details ?
          <PrizeDetails
            closeDetails={this.closeDetails}
            {...details}
            buy={buy}
            locale={locale}
          /> : null }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
});

export default PrizeList;
