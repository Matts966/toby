import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Text from './Text';
import Icon from './Icon';

import { colors } from '../parameters';

export default class Error extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    onClose: PropTypes.func,
    text: PropTypes.string,
  };

  render() {
    const { style, onClose, text } = this.props;

    return (
      <View
        style={[
          styles.errorWrapper,
          style,
        ]}
      >
        <Icon style={styles.warnIcon} name="error-outline" />
        <Text style={styles.errorText}>
          { text }
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Icon style={styles.closeIcon} name="close" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorWrapper: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  warnIcon: {
    color: colors.white,
  },
  errorText: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
    color: colors.white,
  },
  closeIcon: {
    color: colors.white,
  },
});
