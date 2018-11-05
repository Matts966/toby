import { AppRegistry } from 'react-native';

import App from './js/App';
import Api from './js/libs/requests';

import { name as appName } from './app.json';

Api.initialize('https://api.gettoby.com/v2/');

AppRegistry.registerComponent(appName, () => App());
AppRegistry.registerComponent('ShareExt', () => App(true));
