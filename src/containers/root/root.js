import React , { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../config/configureStore';
import { registerScreens } from './navigator';
import { Navigation } from 'react-native-navigation';

const store = configureStore();
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
	screen: {
		screen: 'app.Auth',
		navigatorStyle: {
			navBarHidden: true
		}
	}
});
