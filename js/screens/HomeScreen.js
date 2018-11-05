import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

  render() {
    const { teams, lists, bookmarks } = this.state;

    return (
      <View style={styles.container}>
        <Text>TOBY</Text>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.teams}>My Collections</Text>
          {_.filter(lists, { teamId: null }).map(({ id: listId, title }) => (
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
          {teams.map(({ id: teamId, name }) => (
            <View key={teamId}>
              <Text style={styles.teams}>{name}</Text>
              {_.filter(lists, { teamId }).map(({ id: listId, title }) => (
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
            </View>
          ))}
        </ScrollView>
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
