import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';
import codePush from 'react-native-code-push';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginFacebook, accessTokenChecking } from './actions';
import { languageChecking } from '../../utils/language';
import BackgroundImage from '../../components/utilities/backgroundImage';
import StarsImage from '../../components/utilities/starsImage';
import Button from '../../components/utilities/buttons';
import Logo from './components/logo';
import Planet from './components/planet';
import Characters from './components/characters';

class Login extends Component {
  componentWillMount() {
    const { languageChecking, accessTokenChecking, navigator } = this.props;
    // Acess Token Checking
    accessTokenChecking(navigator);
    // User Language Checking
    languageChecking();
    // check for code push update and download
    if (!__DEV__) codePush.sync();
  }
  shouldComponentUpdate(nextProps) {
    const { language } = this.props;
    return language.locale !== nextProps.language.locale;
  }
  render() {
    const { loginFacebook, navigator, language } = this.props;
    const { locale, string } = language;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BackgroundImage type="random" />
        <StarsImage />
        <Logo locale={locale} />
        <View style={styles.innerContainer}>
          <Characters />
          <Planet />
        </View>
        <View style={styles.bottom}>
          <Button
            text={string.facebookLogin}
            textStyle={{
              color: 'white',
              fontSize: 25,
              fontFamily: (Platform.OS === 'ios') ? 'Bauhaus 93' : 'Bauhaus-93_6274',
            }}
            btnStyle={{
              backgroundColor: '#3B5998',
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginVertical: 5,
            }}
            borderColor="#203559"
            onPressFunction={() => loginFacebook(navigator)}
          />
          <Button
            text={string.takeALook}
            textStyle={{
              color: 'white',
              fontSize: 25,
              fontFamily: (Platform.OS === 'ios') ? 'Bauhaus 93' : 'Bauhaus-93_6274',
            }}
            btnStyle={{
              backgroundColor: '#34655e',
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginVertical: 5,
            }}
            borderColor="#22443e"
            onPressFunction={() => {
              navigator.resetTo({
                screen: 'app.GamePlayList',
                navigatorStyle: {
                  navBarHidden: true,
                },
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingVertical: 50,
  },
});

function mapStateToProps(state) {
  return {
    language: state.preference.language,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginFacebook,
    accessTokenChecking,
    languageChecking,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
