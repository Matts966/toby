import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, View, StyleSheet, Animated, ScrollView,
} from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

import Text from './Text';
import Icon from './Icon';

import { colors, fonts } from '../parameters';

const TABLABEL = 130;

export default class TabBar extends Component {
  static propTypes = {
    screenProps: PropTypes.object,
    navigation: PropTypes.object,
    position: PropTypes.object,
    navigationState: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this._menu = React.createRef();
    this._scrollView = React.createRef();
  }

  hideMenu = () => {
    this._menu.current.hide();
  };

  showMenu = () => {
    this._menu.current.show();
  };

  onTabPress = routeName => () => this.props.navigation.navigate(routeName)

  onLogout = () => this.props.screenProps.logout();

  _renderIndicator = () => {
    const { position, navigationState } = this.props;

    const translateX = Animated.multiply(
      position.interpolate({
        inputRange: [0, navigationState.routes.length - 1],
        outputRange: [0, navigationState.routes.length - 1],
        extrapolate: 'clamp',
      }),
      TABLABEL,
    );
    return (
      <Animated.View
        style={[
          styles.indicator,
          { width: TABLABEL, transform: [{ translateX }] },
        ]}
      />
    );
  }

  renderLabels = () => {
    const { navigation } = this.props;

    return navigation.state.routes.map(({ key, routeName }, index) => (
      <TouchableOpacity
        key={key}
        onPress={this.onTabPress(routeName)}
        style={styles.label}
      >
        <Text
          style={[
            styles.labelText,
            (this.props.navigation.state.index === index) && styles.labelTextSelected,
          ]}
        >
          { routeName }
        </Text>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.tabBar}>
        <ScrollView
          style={styles.tabs}
          contentContainerStyle={styles.tabsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {this.renderLabels()}

          <View
            pointerEvents="none"
            style={styles.indicatorWrapper}
          >
            {this._renderIndicator()}
          </View>
        </ScrollView>
        <View>
          <Menu
            ref={this._menu}
            button={(
              <TouchableOpacity onPress={this.showMenu}>
                <Icon name="more-vert" />
              </TouchableOpacity>
            )}
          >
            <MenuItem onPress={this.onLogout}>
              Logout
            </MenuItem>
          </Menu>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: 56,
    zIndex: 1,
    ...colors.shadow,
  },
  tabs: {
    height: '100%',
    flex: 1,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  label: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    width: TABLABEL,
  },
  labelText: {
    paddingTop: 2,
    color: colors.secondaryTransparent,
    marginHorizontal: 4,
    ...fonts.medium,
  },
  labelTextSelected: {
    color: colors.black,
  },
  indicatorWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  indicator: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
