import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../../components/utilities/buttons';

function toLogin(navigator) {
  navigator.resetTo({
    screen: 'app.Auth',
    navigatorStyle: {
      navBarHidden: true,
    },
    animationType: 'fade',
  });
}

const LoginButton = ({ navigator }) =>
  (
    <View>
      <Text style={styles.instruction}>Please Login to play</Text>
      <Button
        text="Go to Login"
        textStyle={styles.textStyle}
        btnStyle={styles.btnStyle}
        borderColor="#203559"
        onPressFunction={() => toLogin(navigator)}
      />
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  textStyle: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Bauhaus 93',
  },
  btnStyle: {
    backgroundColor: '#3B5998',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
});

export default LoginButton;
