import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ShareExtHelper from './libs/shareExtHelper';

import MainNavigator from './navigation/MainNavigator';

import configureStore from './configureStore';

YellowBox.ignoreWarnings([
  'Remote debugger',
]);

const { persistor, store } = configureStore();

export default (share = false) => (
  class App extends React.Component {
    componentDidMount() {
      ShareExtHelper.initialize(share);
    }

    render() {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <MainNavigator />
          </PersistGate>
        </Provider>
      );
    }
  }
);
