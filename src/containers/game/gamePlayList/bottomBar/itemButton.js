import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { playUISound } from '../../../../utils/sound';


class ItemButton extends Component {
  constructor() {
    super();
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { language } = this.props;
    return language.locale !== nextProps.language.locale;
  }

  onButtonPress() {
    this.props.playUISound('click1');
    const { navigator, navigate } = this.props;
    navigator.push({
      screen: navigate,
      navigatorStyle: {
        navBarHidden: true,
      },
      animationType: 'fade',
    });
  }

  render() {
    const {
      name,
      icon,
      language,
    } = this.props;
    const { string } = language;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onButtonPress}
      >
        <Icon name={icon} size={25} color="white" />
        <Text style={styles.text}>{string[name]}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 57,
    width: 57,
    marginHorizontal: Dimensions.get('window').width / 90,
    // backgroundColor : '#5AA1AD',
    backgroundColor: 'rgba(37, 47, 100, 0.5)',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    textAlign: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    playUISound,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    language: state.preference.language,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemButton);
