import SharedGroupPreferences from 'react-native-shared-group-preferences';

export default {
  getItem: (key: string) => SharedGroupPreferences.getItem(key, 'group.com.toby'),
  setItem: (key: string, item: string) => SharedGroupPreferences.setItem(key, item, 'group.com.toby'),
  removeItem: () => new Promise((resolve) => {
    resolve();
  }),
};
