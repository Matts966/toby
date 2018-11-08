import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, Image, View, StyleSheet, Linking,
} from 'react-native';

import Text from './Text';

import { colors, fonts } from '../parameters';

export default class Bookmark extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    data: PropTypes.object,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
  }

  onPress = () => (!this.props.disabled && Linking.openURL(this.props.data.url));

  render() {
    const {
      style,
      data: {
        title,
        description,
        favIconUrl,
      },
    } = this.props;

    return (
      <View
        style={[
          styles.bookmark,
          style,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this.onPress}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <View
                style={[
                  styles.favIconWrapper,
                  !favIconUrl && styles.noFavIcon,
                ]}
              >
                {!!favIconUrl && (
                  <Image
                    resizeMode="contain"
                    source={{ uri: favIconUrl }}
                    style={styles.favIcon}
                  />
                )}
              </View>
              <Text
                style={styles.title}
                numberOfLines={2}
              >
                { title }
              </Text>
            </View>
          </View>
          { !!description && (
            <View style={[styles.container, styles.footer]}>
              <Text
                style={styles.description}
                numberOfLines={1}
              >
                { description }
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookmark: {
    backgroundColor: colors.white,
    borderRadius: 4,
    ...colors.shadow,
  },
  container: {
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 8,
  },
  header: {
    flexDirection: 'row',
  },
  favIconWrapper: {
    borderRadius: 50,
    height: 24,
    width: 24,
    marginRight: 8,
    opacity: 0.8,
  },
  noFavIcon: {
    backgroundColor: colors.greyDark,
  },
  favIcon: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    ...fonts.medium,
    color: colors.secondaryTransparent,
    flex: 1,
  },
  footer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderColor: colors.secondaryTransparentLight,
  },
  description: {
    fontSize: 12,
    ...fonts.light,
    color: colors.greyDark,
  },
});
