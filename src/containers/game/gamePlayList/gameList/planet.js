import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Animated, Easing, PanResponder,
  View, ActivityIndicator, StyleSheet,
  Dimensions, Platform, Text,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchTag } from '../../actions';

const planet = require('../../../../../assets/planet/earth.png');

const { width } = Dimensions.get('window');

class Planet extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY();
    this.spinAnimation = new Animated.Value(0);
    this.blinkAnimation = new Animated.Value(0.2);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        this.position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const swipeThreshold = width * 0.2;
        const { dx, dy } = gestureState;
        if (dx > swipeThreshold) {
          this.forceSwipe('right');
          this.resetPosition();
        } else if (dx < -swipeThreshold) {
          this.forceSwipe('left');
          // console.warn('Left');
          this.resetPosition();
        } else {
          // console.warn('Reset')
          this.resetPosition();
        }
      },
    });
  }
  componentDidMount() {
    Animated.loop(Animated.timing(
      this.spinAnimation,
      {
        toValue: 1,
        duration: 50000,
        easing: Easing.linear,
      },
    )).start();
    Animated.loop(Animated.sequence([
      Animated.timing(this.blinkAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this.blinkAnimation, {
        toValue: 0.2,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])).start();
  }

  shouldComponentUpdate(nextProps) {
    const { tag } = this.props;
    return nextProps.tag !== tag;
  }

  forceSwipe(direction) {
    const action = (direction === 'left') ? 'back' : 'next';
    this.props.switchTag(action);
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }
  planetStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    const spin = this.spinAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }, { rotate: spin }],
    };
  }
  blinkStyle() {
    return {
      opacity: this.blinkAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }

  renderSwipeIndicator(direction) {
    const { tag, tags } = this.props;
    const { index } = tag;
    const next = (direction === 'right') ? 1 : -1;
    const swipeExist = (tags[index + next] !== undefined);
    return (swipeExist === true) ? (
      <Animated.View
        style={[styles[`${direction}SwipeIndicator`], this.blinkStyle()]}
      >
        <Icon
          name={`angle-double-${direction}`}
          size={55}
          color="white"
          onPress={() => this.forceSwipe(direction)}
        />
        { (next === 1) ? <Text style={{ color: 'white' }}>More</Text> : null}
      </Animated.View>
    ) : <View style={{ flex: 0.3 }} />;
  }

  renderDisplay(tag) {
    let source;
    if (!tag.images) {
      source = planet;
    } else if (typeof tag.images === 'string') {
      source = { uri: tag.images };
    } else {
      source = tag.images;
    }
    return (
      <View style={styles.innerContainer}>
        {this.renderSwipeIndicator('left')}
        <Animated.Image
          {...this.panResponder.panHandlers}
          source={source || planet}
          style={[styles.image, this.planetStyle()]}
          resizeMode="contain"
        />
        {this.renderSwipeIndicator('right')}
      </View>
    );
  }

  render() {
    const { tag } = this.props;
    return (
      <View style={styles.container}>
        {(tag !== null) ?
        this.renderDisplay(tag) :
        <ActivityIndicator size="small" color="white" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
      },
    }),
  },
  rightSwipeIndicator: {
    flex: 0.3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  leftSwipeIndicator: {
    flex: 0.3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
  },
});

function mapStateToProps(state) {
  return {
    tag: state.game.tag,
    tags: state.game.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    switchTag,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Planet);
