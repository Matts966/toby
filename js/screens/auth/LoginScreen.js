import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import Api from '../../libs/requests';
import ShareExtHelper from '../../libs/shareExtHelper';

import { apiLogin, authenticate } from '../../actions/auth';
import Spinner from '../../components/Spinner';

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    token: PropTypes.string,
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

    if (props.token) {
      Api.setAuthorisation(props.token);
      props.navigation.navigate(ShareExtHelper.share ? 'ShareScreen' : 'App');
    }
  }

  onLoginPress = () => {
    const { email, password } = this.state;
    const { dispatch, navigation } = this.props;

    this.setState({ loading: true });

    apiLogin({ email, password })
      .then(({ token, ...user }) => {
        Api.setAuthorisation(token);
        dispatch(authenticate({ token, user }));
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

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(LoginScreen);

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
