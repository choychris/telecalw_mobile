import codePush from 'react-native-code-push';
import { AppRegistry } from 'react-native';
import Root from './src/containers/root/root';

const CodePushRoot = codePush(Root);

if (!__DEV__) {
  console = {};
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

AppRegistry.registerComponent('mobile_app', () => CodePushRoot);
