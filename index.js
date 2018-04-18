import { AppRegistry } from 'react-native';
import {Platform, StyleSheet} from 'react-native';
import Root from './src/containers/root/root';
if(!__DEV__) {
    console = {};
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
}
AppRegistry.registerComponent('mobile_app', () => Root);
