import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { navigateToGameRoom } from '../../actions';
import { playUISound } from '../../../../utils/sound';
import Planet from './planet';
import Orbit from './orbit';
import ItemContainer from './itemContainer';
import BananaThumbnail from './bananaThumbnail';
import StackerThumbnail from './stackerThumbnail';

class ListContainer extends Component {
  constructor() {
    super();
    this.toGame = this.toGame.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    const { tag, products } = this.props;
    return tag !== nextProps.tag || products !== nextProps.products;
  }

  toGame(screen) {
    const { navigator, playUISound, stop } = this.props;
    if (screen === 'app.BananaGame') {
      playUISound('start');
      stop();
    }
    navigator.push({
      screen,
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
            <View style={[styles.subContainer, { alignItems: 'center' }]}>
              <BananaThumbnail toGame={() => this.toGame('app.BananaGame')} />
              <StackerThumbnail toGame={() => this.toGame('app.StackerGame')} />
            </View> : null }
        </View>
        <Planet />
        <View style={styles.subContainer}>
          { (tag !== null && products[tag.id]) ?
            this.renderItems(products[tag.id].slice(2, 4)) : null }
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
