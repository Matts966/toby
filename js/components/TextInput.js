import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  Animated,
} from 'react-native';

import Text from './Text';

import { colors } from '../parameters';

const MAX_PAN_Y = 32;

export default class TextInput extends Component {
  static propTypes = {
    style: PropTypes.any,
    inputStyle: PropTypes.any,
    showPasswordStyle: PropTypes.any,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    defaultValue: PropTypes.string,
    underlineColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    selectionColor: PropTypes.string,
    password: PropTypes.bool,
    label: PropTypes.string,
  }

  static defaultProps = {
    onChangeText: () => {},
    placeholder: '',
    maxLength: null,
    multiline: false,
    defaultValue: '',
    underlineColor: colors.primaryTransparentLight,
  }

  constructor(props) {
    super(props);

    const length = props.defaultValue && props.defaultValue.length || 0;

    this.state = {
      length,
      showPassword: false,
      panY: new Animated.Value(length ? 0 : MAX_PAN_Y),
    };
  }

  onChangeText(text) {
    this.setState({ length: text.length });
    this.props.onChangeText(text);
  }

  onShowPasswordPress = () => this.setState(
    ({ showPassword }) => ({ showPassword: !showPassword }),
  );

  onFocus = () => {
    Animated.timing(this.state.panY, {
      duration: 100,
      useNativeDriver: true,
      toValue: 0,
    }).start();
  }

  onBlur = () => {
    if (!this.state.length) {
      Animated.timing(this.state.panY, {
        duration: 100,
        useNativeDriver: true,
        toValue: MAX_PAN_Y,
      }).start();
    }
  }

  render() {
    const { panY } = this.state;
    const {
      style,
      inputStyle,
      showPasswordStyle,
      underlineColor,
      placeholderColor,
      selectionColor,
      password,
      multiline,
      maxLength,
      placeholder,
      defaultValue,
      autoCapitalize,
      label,
    } = this.props;

    const { length, showPassword } = this.state;

    return (
      <View style={[styles.wrapper, style]}>
        <Animated.View
          style={[
            styles.labelWrapper,
            {
              transform: [
                { translateY: panY },
              ],
            },
          ]}
        >
          <Text style={styles.label}>
            { label }
          </Text>
        </Animated.View>
        <View
          style={[
            styles.inputWrapper,
            { borderColor: underlineColor },
          ]}
        >
          <RNTextInput
            underlineColorAndroid="transparent"
            style={[
              styles.input,
              inputStyle,
            ]}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            maxLength={maxLength}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChangeText={text => this.onChangeText(text)}
            placeholderTextColor={placeholderColor}
            selectionColor={selectionColor}
            secureTextEntry={password && !showPassword}
            textContentType={password && 'none' || null}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          {password && length > 0 && (
            <Text
              style={[
                styles.showPassword,
                showPasswordStyle,
              ]}
              onPress={this.onShowPasswordPress}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 12,
  },
  labelWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  label: {
    color: colors.secondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  showPassword: {
    fontSize: 12,
    color: colors.secondary,
  },
  suffixes: {
    marginRight: 8,
  },
});
