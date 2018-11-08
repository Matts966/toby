import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modalbox';
import ShareExtension from 'react-native-share-extension';
import LinkPreview from 'react-native-link-preview';
import _ from 'lodash';

import { fetchBookmarks, addBookmark } from '../actions/bookmarks';

import Bookmark from '../components/Bookmark';
import Icon from '../components/Icon';
import Text from '../components/Text';
import Button from '../components/Button';

import { colors, sizes, fonts } from '../parameters';

const TABS = {
  0: 'All',
  1: 'My Collections',
  2: 'Shared',
};

export default class ShareScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      lists: [],
      loading: false,
      bookmark: {},
      index: 0,
    };

    this._menu = React.createRef();
  }

  componentWillMount() {
    this.setState({ loading: true });

    Promise.all([
      ShareExtension.data()
        .then(({ value }) => LinkPreview.getPreview(value))
        .then(({
          url, title, description, favicons, images,
        }) => this.setState({
          bookmark: {
            url,
            title,
            description,
            favIconUrl: favicons && favicons.length && favicons[0] || '',
            image: images && images.length && images[0] || '',
          },
        })),
      fetchBookmarks()
        .then(({ lists }) => this.setState({ lists })),
    ]).then(() => {
      this.setState({ loading: false });
    });
  }

  onClose = () => ShareExtension.close()

  async onAdd() {
    const {
      bookmark,
      lists,
    } = this.state;
    const selectedLists = _.filter(lists, { selected: true });

    this.setState({ loading: true });

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < selectedLists.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await addBookmark({
        ...bookmark,
        listId: selectedLists[i].id,
      });
    }

    this.setState({ loading: false });
    this.onClose();
  }

  closing = () => this.setState({ isOpen: false });

  onTabPress = index => () => this.setState({ index })

  onCollectionPress = id => () => this.setState(prevState => ({
    lists: _.map(prevState.lists, list => ((list.id === id) ? ({
      ...list,
      selected: !list.selected,
    }) : list)),
  }))

  render() {
    const {
      isOpen, bookmark, lists, loading, index,
    } = this.state;

    let collections;

    switch (index) {
      case 1:
        collections = _.filter(lists, { teamId: null });
        break;
      case 2:
        collections = _.filter(lists, ({ teamId }) => teamId);
        break;
      case 0:
      default:
        collections = lists;
    }

    const valid = _.size(_.filter(lists, { selected: true }));

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
              <Icon name="close" />
            </TouchableOpacity>
            <Text style={styles.title}>
              Add a new Bookmark
            </Text>
            <Bookmark
              style={styles.bookmark}
              data={bookmark}
              disabled
            />
            <View style={styles.collections}>
              <View style={styles.tabsWrapper}>
                {_.map(TABS, (title, i) => (
                  <TouchableOpacity
                    key={title}
                    onPress={this.onTabPress(+i)}
                    style={[
                      styles.tabLabel,
                      (index === +i) && styles.current,
                    ]}
                  >
                    <Text
                      style={[
                        styles.label,
                        (index === +i) && styles.labelSelected,
                      ]}
                    >
                      { title }
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View>
                <ScrollView style={styles.scrollView}>
                  {_.map(collections, ({ title, id, selected }) => (
                    <TouchableOpacity
                      key={id}
                      style={styles.collection}
                      onPress={this.onCollectionPress(id)}
                    >
                      {selected && (
                        <Icon style={styles.checkIcon} name="check" />
                      )}
                      <Text
                        style={styles.collectionTitle}
                      >
                        { title }
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Button
                  style={styles.button}
                  onPress={() => this.onAdd()}
                  disabled={!valid}
                >
                  <Text>Add Bookmark</Text>
                </Button>
              </View>
            </View>
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
    width: 0.8 * sizes.width,
    borderRadius: 4,
    backgroundColor: colors.white,
    padding: 24,
  },
  title: {
    fontSize: 20,
    color: colors.primary,
  },
  bookmark: {
    marginVertical: 24,
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
  scrollView: {
    height: 130,
  },
  tabsWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tabLabel: {
    backgroundColor: colors.grey,
    marginRight: 8,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  current: {
    borderBottomWidth: 2,
    borderColor: colors.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  label: {
    ...fonts.light,
    color: colors.secondary,
  },
  labelSelected: {
    color: colors.black,
  },
  collection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteDark,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: colors.secondaryTransparentLight,
  },
  checkIcon: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
  },
  collectionTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.blackLight,
  },
  button: {
    marginTop: 24,
  },
});
