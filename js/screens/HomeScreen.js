import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import _ from 'lodash';

import Api from '../libs/requests';
import Store from '../libs/store';

import { fetchBookmarks } from '../actions/bookmarks';

import TabBar from '../components/TabBar';
import Text from '../components/Text';
import Spinner from '../components/Spinner';
import Bookmark from '../components/Bookmark';

import { colors, fonts } from '../parameters';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      lists: [],
      bookmarks: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({ loading: true });

    fetchBookmarks()
      .then(
        ({ teams, lists, bookmarks }) => this.setState({
          teams,
          lists,
          bookmarks,
          loading: false,
        }),
      );
  }

  logout = () => {
    Store.removeItem('token');
    Api.removeAuthorisation();
    this.props.navigation.navigate('Auth');
  }

  tabsNavigator = () => {
    const defaultTeam = {
      id: null,
      name: 'My Collections',
    };
    const { teams, lists, bookmarks } = this.state;

    const tabs = _.reduce(
      [defaultTeam, ...teams],
      (routes, { name, id }) => ({
        ...routes,
        [_.capitalize(name)]: () => {
          const scrollViewElements = [];

          _.filter(lists, { teamId: id }).forEach(({ id: listId, title }) => {
            scrollViewElements.push({
              key: listId,
              data: { title },
              type: 'title',
            });

            _.filter(bookmarks, { listId }).forEach((bookmark) => {
              scrollViewElements.push({
                key: bookmark.id,
                type: 'bookmark',
                data: bookmark,
              });
            });
          });

          return (
            <ScrollView
              style={styles.tabs}
              stickyHeaderIndices={_.map(_.keys(_.pickBy(scrollViewElements, { type: 'title' })), Number)}
            >
              {_.map(scrollViewElements, ({ key, data, type }) => ((type !== 'bookmark') ? (
                <View
                  key={key}
                  style={styles.listsTitleWrapper}
                >
                  <View style={styles.listsTitleHelper}>
                    <Text style={styles.listsTitle}>
                      {data.title}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  key={key}
                  style={styles.bookmarkWrapper}
                >
                  <Bookmark
                    style={styles.bookmark}
                    data={data}
                  />
                </View>
              )))}
            </ScrollView>
          );
        },
      }),
      {},
    );

    return createMaterialTopTabNavigator(tabs, {
      tabBarComponent: TabBar,
    });
  }

  render() {
    const { loading } = this.state;
    const TabsNavigator = this.tabsNavigator();

    return (
      <SafeAreaView style={styles.container}>
        <TabsNavigator
          screenProps={{
            logout: this.logout,
            refresh: this.refresh,
          }}
        />
        <Spinner overlay visible={loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    paddingBottom: 16,
  },
  listsTitleWrapper: {
    marginTop: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    marginBottom: 8,
    zIndex: 9,
  },
  listsTitleHelper: {
    borderBottomWidth: 1,
    borderColor: colors.primaryTransparentLight,
  },
  listsTitle: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 20,
    ...fonts.bold,
    paddingVertical: 6,
  },
  bookmarkWrapper: {
    paddingHorizontal: 16,
    zIndex: 1,
  },
  bookmark: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
});
