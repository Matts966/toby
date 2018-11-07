import Api from '../libs/requests';

export function apiSignUp(data) {
  return Api.post('users', { params: data });
}

export function apiLogin(data) {
  return Api.post('users/login', { params: data });
}
