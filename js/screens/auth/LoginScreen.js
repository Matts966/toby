import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Api from '../../libs/requests';
import Store from '../../libs/store';
import ShareExtHelper from '../../libs/shareExtHelper';

import { apiLogin } from '../../actions/auth';

import Spinner from '../../components/Spinner';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';

import { colors, fonts } from '../../parameters';

const logo = require('../../../assets/images/logo.png');

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
      email: '',
      password: '',
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
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          Log in to Toby
        </Text>
        <View style={styles.inputsWrapper}>
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
  },
  input: {
    marginTop: 12,
  },
});
