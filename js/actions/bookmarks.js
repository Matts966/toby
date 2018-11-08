import Api from '../libs/requests';

export function addBookmark(data) {
  return Api.post('cards', { params: data });
}

export function fetchBookmarks() {
  return Api.get('states')
    .then((res) => {
      const { teams } = res;
      let { lists } = res;
      const bookmarks = [];

      lists = lists.map(({ cards, ...list }) => {
        bookmarks.push(...cards);
        return list;
      });

      return {
        teams, lists, bookmarks,
      };
    });
}
