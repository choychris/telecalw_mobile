import React, { Component } from 'react';
import { Easing, Animated, FlatList, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ItemButton from './itemButton';
import Telebot from '../../../../components/telebuddies/telebot';

class BarContainer extends Component {
  constructor(props) {
    super(props);
    this.floating = new Animated.ValueXY({
      x: 0,
      y: 0,
    });
  }
  componentDidMount() {
    this.floatingAnimation();
  }
  shouldComponentUpdate(nextProps) {
    const { version, token } = this.props;
    return version !== nextProps.version || token !== nextProps.token;
  }
  floatingAnimation() {
    Animated.loop(Animated.sequence([
      Animated.timing(this.floating, {
        duration: 1000,
        toValue: {
          x: 0,
          y: -5,
        },
        easing: Easing.linear,
      }),
      Animated.timing(this.floating, {
        duration: 1000,
        toValue: {
          x: 0,
          y: 0,
        },
        easing: Easing.linear,
      }),
    ])).start();
  }
  renderTabItems() {
    const { navigator } = this.props;
    const renderMenu = [

      { icon: 'rocket', name: 'delivery', navigate: 'app.Delivery' },
      { icon: 'dollar', name: 'wallet', navigate: 'app.TopUp' },
      { icon: 'gift', name: 'reward', navigate: 'app.Reward' },
      { icon: 'question-circle', name: 'support', navigate: 'app.Support' },

    ];
    return (
      <FlatList
        style={{ paddingHorizontal: 10 }}
        horizontal
        data={renderMenu}
        renderItem={({ item }) =>
          <ItemButton
            {...item}
            navigator={navigator}
          />}
        keyExtractor={(_item, index) => index}
      />
    );
  }
  render() {
    const { navigator, token } = this.props;
    const screenWidth = Dimensions.get('window').width * 0.25;
    return (
      <View style={styles.container}>
        {(token.lbToken !== undefined) ? this.renderTabItems() : null}
        <Animated.View style={this.floating.getLayout()}>
          <TouchableOpacity
            disabled={token.lbToken === undefined}
            onPress={() => {
              if (token.lbToken !== undefined) {
                navigator.push({
                  screen: 'app.Setting',
                  navigatorStyle: {
                    navBarHidden: true,
                  },
                });
              }
            }}
          >
            <Telebot
              status="setting"
              style={{ margin: 5 }}
              height={screenWidth}
              width={screenWidth}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    version: state.mis.version,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, null)(BarContainer);
