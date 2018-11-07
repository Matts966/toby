import { AsyncStorage } from 'react-native';

export default {
  getItem: key => AsyncStorage.getItem(key),
  setItem: (key, item) => AsyncStorage.setItem(key, item),
};
