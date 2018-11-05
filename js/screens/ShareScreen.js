import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Button,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modalbox';
import ShareExtension from 'react-native-share-extension';
import LinkPreview from 'react-native-link-preview';

import { fetchBookmarks, addBookmark } from '../actions/bookmarks';

import { colors } from '../constants/parameters';

export default class ShareScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      lists: [],
      selectedList: null,
      loading: false,
      bookmark: {},
    };
  }

  componentDidMount() {
    fetchBookmarks()
      .then((res) => {
        let { lists } = res;
        const bookmarks = [];

        lists = lists.map(({ cards, ...list }) => {
          bookmarks.push(...cards);
          return list;
        });

        this.setState({ lists });
      });

    ShareExtension.data()
      .then(({ value }) => LinkPreview.getPreview(value))
      .then(bookmark => this.setState({ bookmark }));
  }

  onClose = () => ShareExtension.close()

  closing = () => this.setState({ isOpen: false });

  onListSelect = id => this.setState({ selectedList: id });

  onAdd = () => {
    const {
      bookmark: {
        url,
        title,
        description,
        images,
        favicons,
      },
      selectedList,
    } = this.state;

    this.setState({ loading: true });
    addBookmark({
      url,
      title,
      description,
      image: images && images.length && images[0],
      favIconUrl: favicons && favicons.length && favicons[0],
      listId: selectedList,
    }).then(() => {
      this.setState({ loading: false });
      this.onClose();
    }).catch(() => this.setState({ loading: false }));
  }

  render() {
    const {
      isOpen, bookmark, lists, loading,
    } = this.state;

    return (
      <Modal
        backdrop={false}
        style={styles.modal}
        position="center"
        isOpen={isOpen}
        onClosed={this.onClose}
      >
        <View style={styles.wrapper}>
          <View style={styles.body}>
            <TouchableOpacity
              onPress={this.closing}
              style={styles.close}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <View>
              <Text>
                Add
              </Text>
              <Text numberOfLines={1}>
                { bookmark.url }
              </Text>
              <Text>
                To
              </Text>
            </View>
            <Picker onValueChange={this.onListSelect}>
              {lists.map(({ id, title }) => (
                <Picker.Item
                  key={id}
                  label={title}
                  value={id}
                />
              ))}
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Button
              onPress={this.onAdd}
              title="Add Bookmark"
              disabled={loading}
            />
            {loading && (
              <View style={styles.spinnerWrapper}>
                <ActivityIndicator
                  size="large"
                  animating
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  body: {
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 200,
    width: 300,
    padding: 16,
    justifyContent: 'space-between',
  },
  bookmarks: {
    fontSize: 14,
    paddingLeft: 16,
  },
  close: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  spinnerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.whiteTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
