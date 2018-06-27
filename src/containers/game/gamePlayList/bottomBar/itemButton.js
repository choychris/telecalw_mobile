import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { playUISound } from '../../../../utils/sound';


class ItemButton extends Component {
  shouldComponentUpdate(nextProps) {
    const { language } = this.props;
    return language.locale !== nextProps.language.locale;
  }
  render() {
    const {
      name,
      icon,
      navigate,
      navigator,
      language,
      playUISound,
    } = this.props;
    const { string } = language;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          playUISound('click1');
          navigator.push({
            screen: navigate,
            navigatorStyle: {
              navBarHidden: true,
            },
            animationType: 'fade',
          });
        }}
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
    height: 55,
    width: 55,
    marginHorizontal: Dimensions.get('window').width / 70,
    // backgroundColor : '#5AA1AD',
    backgroundColor: 'rgba(37, 47, 100, 0.5)',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
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
