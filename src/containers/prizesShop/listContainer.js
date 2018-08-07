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
    this.slideIn = new Animated.Value(0);
    this.showDetails = this.showDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
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

  showDetails(i) {
    const { prizes } = this.props;
    this.setState({ details: prizes[i] });
    Animated.timing(
      this.slideIn,
      {
        toValue: -500,
        duration: 600,
        useNativeDriver: true,
      },
    ).start();
  }

  closeDetails() {
    Animated.timing(
      this.slideIn,
      {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      },
    ).start(() => {
      this.setState({ details: null });
    });
  }

  render() {
    const { prizes, buy } = this.props;
    const { details } = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: this.animate,
            transform: [{ translateX: this.slideIn }],
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
              showDetails={() => this.showDetails(index)}
            />
          }
        />
        { details ?
          <PrizeDetails
            closeDetails={this.closeDetails}
            {...details}
            buy={buy}
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
  },
});

export default PrizeList;
