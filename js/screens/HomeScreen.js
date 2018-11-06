import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import _ from 'lodash';

import { fetchBookmarks } from '../actions/bookmarks';

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
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {_.filter(lists, { teamId: id }).map(({ id: listId, title }) => (
              <View key={listId}>
                <Text style={styles.lists}>
                  {title}
                </Text>
                {_.filter(bookmarks, { listId }).map(({ id: bookmarkId, url }) => (
                  <Text
                    key={bookmarkId}
                    style={styles.bookmarks}
                  >
                    {url}
                  </Text>
                ))}
              </View>
            ))}
          </ScrollView>
        ),
      }),
      {},
    );

    return createMaterialTopTabNavigator(tabs, {
      tabBarComponent: props => (
        <View>
          <View>
            <MaterialTopTabBar {...props}><Text>Bla</Text></MaterialTopTabBar>
          </View>
          <View>
            <Text>Bla</Text>
          </View>
        </View>
      ),
    });
  }

  render() {
    const TabsNavigator = this.tabsNavigator();

    return (
      <View style={styles.container}>
        <TabsNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  teams: {
    fontSize: 24,
  },
  lists: {
    fontSize: 18,
    paddingLeft: 8,
  },
  bookmarks: {
    fontSize: 14,
    paddingLeft: 16,
  },
});
