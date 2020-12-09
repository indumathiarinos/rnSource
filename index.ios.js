/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigation';
// import App from './screens/snackbar';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
