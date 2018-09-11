import React, { Component } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import rand from 'lodash/random';
import max from 'lodash/max';
import { saveLastIndex, endGame } from '../../actions/gameActions';
import { boxNum, rowNum } from '../../config/constants';
import ControlButton from './controlButton';
import RewardLine from './rewardLine';
import Box from './box';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.game.rows[props.rowIndex - 1].index,
      move: 1,
    };
    this.drop = new Animated.Value(0);
    this.startMove = this.startMove.bind(this);
    this.stopMove = this.stopMove.bind(this);
    if (!props.game.end && props.rowIndex === rowNum) {
      this.startMove();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { rowIndex, game } = this.props;
    const activeRowChanged = nextProps.game.activeRow !== game.activeRow;
    if (!nextProps.game.end && activeRowChanged) {
      const rowMatch = nextProps.game.activeRow === rowIndex;
      if (activeRowChanged && rowMatch) {
        this.animation();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { rowIndex, game } = this.props;
    const stateChange = this.state !== nextState;
    const activeRowChanged = nextProps.game.activeRow !== game.activeRow;
    const rowMatch = nextProps.game.activeRow === rowIndex;
    return (stateChange || activeRowChanged || rowMatch);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startMove() {
    this.timer = setInterval(() => {
      const { index } = this.state;
      const { game, rowIndex } = this.props;
      const { size } = game.rows[rowIndex - 1];
      if (index === (9 - size)) {
        this.setState({ move: -1 }, () => {
          const { move } = this.state;
          this.setState({ index: index + move });
        });
      } else if (index === 1) {
        this.setState({ move: 1 }, () => {
          const { move } = this.state;
          this.setState({ index: index + move });
        });
      } else {
        const { move } = this.state;
        this.setState({ index: index + move });
      }
    }, (max([2, this.props.rowIndex - 1.6]) - 1) * rand(36, 42));
  }

  animation() {
    this.drop.setValue(0);
    Animated.timing(
      this.drop,
      {
        toValue: 2,
        duration: 200,
        useNativeDriver: true,
      },
    ).start(this.startMove);
  }

  stopMove() {
    const {
      game, rowIndex, saveIndex, end,
    } = this.props;
    // console.log(rowIndex);
    const { index } = this.state;
    const result = index - game.lastIndex;
    const win = (rand(1, 4) === 2);
    if (rowIndex === 1 && !win && result === 0) {
      setTimeout(() => {
        clearInterval(this.timer);
        end(this.state.index, rowIndex);
      }, 40);
      return;
    }
    clearInterval(this.timer);
    if (rowIndex === 1) {
      if (win && result === 0) {
        end(index, rowIndex, true);
      } else {
        end(index, rowIndex);
        // end(index, rowIndex, true);
      }
    } else if (rowIndex === rowNum) {
      saveIndex(index, rowIndex);
    } else {
      const currentSize = game.rows[rowIndex - 1].size;
      const lastSize = game.rows[rowIndex].size;
      const sameSize = (currentSize === lastSize);
      if (sameSize && result === 0) {
        // console.log('samesize&00', rowIndex);
        saveIndex(index, rowIndex);
      } else if (!sameSize && (result === 1 || result === 0)) {
        saveIndex(index, rowIndex);
      } else {
        end(index, rowIndex);
        // saveIndex(index, rowIndex);
      }// end of 2nd if-else
    }// end of 1st if-else
  }

  render() {
    const {
      boxSize, game, rowIndex, start,
    } = this.props;
    const { index } = this.state;
    const dropRow = this.drop.interpolate({
      inputRange: [0, 0.1, 2],
      outputRange: [0, -200, 0],
    });
    const show = (rowIndex >= game.activeRow);
    const active = (game.activeRow === rowIndex);
    const reward = (rowIndex === 4 || rowIndex === 1);
    const list = new Array(boxNum);
    return (
      <View style={{ zIndex: 1 }}>
        { reward ?
          <RewardLine index={rowIndex} /> :
          null
        }
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateY: dropRow }] },
          ]}
        >
          {
            list.fill().map((emt, i) => <Box
              animateV={index}
              key={Math.random()}
              pos={i + 1}
              boxSize={boxSize}
              size={game.rows[rowIndex - 1].size}
              show={show}
            />)
          }
          {(show && active && start) ? <ControlButton onPress={this.stopMove} /> : null}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    zIndex: 1,
  },
});

const mapStateToProps = state => ({
  game: state.stackerGame.game,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  saveIndex: saveLastIndex,
  end: endGame,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Row);
