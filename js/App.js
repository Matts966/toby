import React from 'react';
import { YellowBox, View, StatusBar } from 'react-native';

import Store from './libs/store';
import ShareExtHelper from './libs/shareExtHelper';

import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './screens/SplashScreen';

import { colors } from './constants/parameters';

YellowBox.ignoreWarnings([
  'Remote debugger',
]);

export default (share = false) => (
  class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loaded: false,
      };

      ShareExtHelper.initialize(share);
    }

    componentWillMount() {
      Store.hydrate().then(() => this.setState({ loaded: true }));
    }

    render() {
      const { loaded } = this.state;

      return !loaded ? (
        <SplashScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={colors.secondary} />
          <MainNavigator />
        </View>
      );
    }
  }
);
