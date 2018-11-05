import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

export default createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
});
