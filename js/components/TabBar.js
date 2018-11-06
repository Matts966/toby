import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import Text from './Text';

import { colors } from '../constants/parameters';

export default class TabBar extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  onTabPress = routeName => () => this.props.navigation.navigate(routeName)

  renderLabels = () => {
    const { navigation } = this.props;

    return navigation.state.routes.map(({ key, routeName }) => (
      <TouchableOpacity
        key={key}
        onPress={this.onTabPress(routeName)}
        style={styles.label}
      >
        <Text style={styles.labelText}>
          { routeName }
        </Text>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.tabBar}>
        <View style={styles.tabs}>
          {this.renderLabels()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 56,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    height: '100%',
    paddingTop: 4,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
  },
  labelText: {
    color: colors.black,
    marginHorizontal: 4,
  },
});
