import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Image, View, KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Api from '../../libs/requests';
import Store from '../../libs/store';
import ShareExtHelper from '../../libs/shareExtHelper';

import { apiSignUp } from '../../actions/auth';

import Spinner from '../../components/Spinner';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Error from '../../components/Error';

import { colors, fonts } from '../../parameters';

const logo = require('../../../assets/images/logo.png');

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

  onLoginPress = () => this.props.navigation.goBack();

  onClose = () => this.setState({ error: null })

  render() {
    const {
      name, email, password, error, loading,
    } = this.state;

    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.container} enabled={false} behavior="height">
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            Sign up to Toby
          </Text>
          <View style={styles.inputsWrapper}>
            {!!error && (
              <Error text={error} onClose={this.onClose} />
            )}
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ name: text })}
              defaultValue={name}
              label="Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ email: text })}
              defaultValue={email}
              label="Email"
            />
            <TextInput
              style={styles.input}
              password
              onChangeText={text => this.setState({ password: text })}
              defaultValue={password}
              label="Password"
            />
          </View>
          <Button
            style={styles.button}
            onPress={this.onSignUpPress}
          >
            <Text>Sign in to Toby</Text>
          </Button>
          <Text
            style={styles.secondButton}
            onPress={this.onLoginPress}
          >
            { 'Already have an account ? Login up now' }
          </Text>
          <Spinner overlay visible={loading} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 48,
  },
  logo: {
    width: 56,
    height: 56,
  },
  title: {
    marginTop: 36,
    fontSize: 20,
    ...fonts.medium,
  },
  inputsWrapper: {
    marginTop: 24,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    marginTop: 12,
  },
  button: {
    height: 64,
    paddingHorizontal: 48,
  },
  secondButton: {
    color: colors.secondary,
    padding: 4,
    marginTop: 24,
  },
});
