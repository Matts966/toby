import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Api from '../../libs/requests';
import Store from '../../libs/store';
import ShareExtHelper from '../../libs/shareExtHelper';

import { apiLogin } from '../../actions/auth';
import Spinner from '../../components/Spinner';

export default class LoginScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: 'julien.rougeron@gmail.com',
      password: 'YRXmbp91',
      error: null,
      loading: false,
    };

    const token = Store.getItem('token');

    if (token) {
      Api.setAuthorisation(token);
      props.navigation.navigate(ShareExtHelper.share ? 'ShareScreen' : 'App');
    }
  }

  onLoginPress = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    apiLogin({ email, password })
      .then(({ token }) => {
        Api.setAuthorisation(token);
        Store.setItem('token', token);
        navigation.navigate(ShareExtHelper.share ? 'ShareScreen' : 'App');
      })
      .catch(({ error }) => this.setState({
        error,
        loading: false,
      }));
  }

  render() {
    const {
      email, password, error, loading,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text>Login</Text>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Text onPress={this.onLoginPress}>Login</Text>
        { error && (
          <Text>{error}</Text>
        )}
        <Spinner overlay visible={loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
  },
});
