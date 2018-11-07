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

import { apiSignUp } from '../../actions/auth';
import Spinner from '../../components/Spinner';

export default class SignUpScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      error: null,
      loading: false,
    };
  }

  onSignUpPress = () => {
    const { name, email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    apiSignUp({ name, email, password })
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
      name, email, password, error, loading,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text>Signup</Text>
        <Text>Full Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ name: text })}
          value={name}
        />
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
        <Text onPress={this.onSignUpPress}>Signup</Text>
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
