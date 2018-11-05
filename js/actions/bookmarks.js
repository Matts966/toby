import Api from '../libs/requests';

export function addBookmark(data) {
  return Api.post('cards', { params: data });
}

export function fetchBookmarks() {
  return Api.get('states');
}
