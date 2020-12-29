/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigation';
// import App from './webview';
// import App from './screens/shareex'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
