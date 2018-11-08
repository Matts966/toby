import storage from './instance';

const STORE_NAME = 'store';

class Store {
  data = {};

  hydrate = () => storage.getItem(STORE_NAME)
    .then((data) => {
      this.data = data || {};
    }).catch(() => true);

  onDataChange = () => storage.setItem(STORE_NAME, this.data);

  getItem = key => this.data[key];

  setItem = (key, item) => {
    this.data = {
      ...this.data,
      [key]: item,
    };

    return this.onDataChange();
  }

  removeItem = (key) => {
    const { [key]: keyToRemove, ...data } = this.data;
    this.data = data;

    return this.onDataChange();
  }
}

export default new Store();
