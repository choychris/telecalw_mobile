import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animated, Easing, PanResponder, View, ActivityIndicator, StyleSheet, Dimensions, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchTag, getPlanetImageSource } from '../../actions';


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
        const swipeThreshold = Dimensions.get('window').width * 0.2;
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
      }),
      Animated.timing(this.blinkAnimation, {
        toValue: 0.2,
        duration: 1000,
        easing: Easing.linear,
      }),
    ])).start();
  }

  shouldComponentUpdate(nextProps) {
    const { tag } = this.props;
    return nextProps.tag !== tag;
  }

  forceSwipe(direction) {
    const action = (direction === 'left') ? 'back' : 'next';
    const { switchTag } = this.props;
    const screenWidth = Dimensions.get('window').width;
    switchTag(action);
    Animated.timing(this.position, {
      toValue: { x: screenWidth, y: 0 },
      duration: 200,
    }).start();
  }
  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }
  planetStyle() {
    const screenWidth = Dimensions.get('window').width;
    const rotate = this.position.x.interpolate({
      inputRange: [-screenWidth * 1.5, 0, screenWidth * 1.5],
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
        />
      </Animated.View>
    ) : null;
  }
  renderDisplay(tag) {
    return (
      <View style={styles.innerContainer}>
        {this.renderSwipeIndicator('left')}
        <Animated.Image
          {...this.panResponder.panHandlers}
          source={getPlanetImageSource(tag.name.en.toLowerCase(), tag.images)}
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
    position: 'absolute',
  },
  innerContainer: {
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
    position: 'absolute',
    left: Dimensions.get('window').width * 0.5,
  },
  leftSwipeIndicator: {
    position: 'absolute',
    right: Dimensions.get('window').width * 0.5,
  },
  image: {
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
