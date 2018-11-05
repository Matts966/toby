import { createSwitchNavigator } from 'react-navigation';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import ShareScreen from '../screens/ShareScreen';

export default createSwitchNavigator({
  App: AppNavigator,
  Auth: AuthNavigator,
  ShareScreen,
},
{
  initialRouteName: 'Auth',
});
