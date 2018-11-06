import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import _ from 'lodash';

import { fetchBookmarks } from '../actions/bookmarks';

import TabBar from '../components/TabBar';
import Text from '../components/Text';
import Bookmark from '../components/Bookmark';

import { colors, fonts } from '../constants/parameters';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      lists: [],
      bookmarks: [],
    };
  }

  componentDidMount() {
    fetchBookmarks()
      .then((res) => {
        const { teams } = res;
        let { lists } = res;
        const bookmarks = [];

        lists = lists.map(({ cards, ...list }) => {
          bookmarks.push(...cards);
          return list;
        });

        this.setState({
          teams, lists, bookmarks,
        });
      });
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
        [_.capitalize(name)]: () => (
          <ScrollView style={styles.tabs}>
            {_.filter(lists, { teamId: id }).map(({ id: listId, title }) => (
              <View
                key={listId}
                style={styles.lists}
              >
                <Text style={styles.listsTitle}>
                  {title}
                </Text>
                {_.filter(bookmarks, { listId }).map(bookmark => (
                  <Bookmark
                    key={bookmark.id}
                    style={styles.bookmark}
                    data={bookmark}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        ),
      }),
      {},
    );

    return createMaterialTopTabNavigator(tabs, {
      tabBarComponent: TabBar,
    });
  }

  render() {
    const TabsNavigator = this.tabsNavigator();

    return (
      <SafeAreaView style={styles.container}>
        <TabsNavigator />
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
    padding: 16,
  },
  lists: {
    marginBottom: 16,
  },
  listsTitle: {
    color: colors.secondary,
    fontSize: 18,
    ...fonts.medium,
    paddingVertical: 6,
  },
  bookmark: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
});
