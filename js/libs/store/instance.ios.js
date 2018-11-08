import SharedGroupPreferences from 'react-native-shared-group-preferences';

export default {
  getItem: key => SharedGroupPreferences.getItem(key, 'group.com.toby'),
  setItem: (key, item) => SharedGroupPreferences.setItem(key, item, 'group.com.toby'),
};
