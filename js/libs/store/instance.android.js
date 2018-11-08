import { AsyncStorage } from 'react-native';
import _ from 'lodash';

export default {
  getItem: key => AsyncStorage.getItem(key)
    .then((item) => {
      let parsedItem;

      try {
        parsedItem = JSON.parse(item);
      } catch (e) {
        parsedItem = item;
      }

      return parsedItem;
    }),
  setItem: (key, item) => AsyncStorage.setItem(key, _.isObject(item) ? JSON.stringify(item) : item),
};
