import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { navigateToGameRoom } from '../../actions';
import { playUISound } from '../../../../utils/sound';
import Planet from './planet';
import Orbit from './orbit';
import ItemContainer from './itemContainer';

const buttonImage = require('../../../../../assets/miniGame/questionMark.png');

class ListContainer extends Component {
  constructor() {
    super();
    this.toGame = this.toGame.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    const { tag, products } = this.props;
    return tag !== nextProps.tag || products !== nextProps.products;
  }

  toGame() {
    const { navigator } = this.props;
    navigator.push({
      screen: 'app.BananaGame',
      navigatorStyle: {
        navBarHidden: true,
      },
      animationType: 'fade',
    });
  }

  renderItems(products, top) {
    const {
      navigator,
      navigateToGameRoom,
      playUISound,
    } = this.props;

    return products.map((item, key) =>
      <ItemContainer
        {...item}
        key={`${item.name.en}${key}`}
        onPressFunction={(productId, status) => {
          playUISound('click2');
          navigateToGameRoom(productId, status, navigator);
        }}
        top={top}
      />);
  }

  render() {
    const { products, tag } = this.props;
    return (
      <View style={styles.container}>
        <Orbit />
        <View style={styles.subContainer}>
          { (tag !== null && products[tag.id]) ?
            this.renderItems(products[tag.id].slice(0, 2), true) : null }
          {tag.game ?
            <View style={styles.imageContainer}>
              <TouchableWithoutFeedback onPress={this.toGame}>
                <Image source={buttonImage} style={styles.imageStyle} />
              </TouchableWithoutFeedback>
            </View> : null }
        </View>
        <Planet />
        <View style={[styles.subContainer]}>
          { (tag !== null && products[tag.id]) ?
            this.renderItems(products[tag.id].slice(3, 5)) : null }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
  imageContainer: {
    alignSelf: 'center',
  },
  imageStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

function mapStateToProps(state) {
  return {
    products: state.game.products,
    tag: state.game.tag,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    navigateToGameRoom,
    playUISound,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
