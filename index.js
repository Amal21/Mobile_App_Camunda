/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import  base64Polyfill from './src/base64Polyfill'

AppRegistry.registerComponent(appName, () => App);
