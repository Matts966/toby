import Api from '../libs/requests';

import { AUTHENTICATE } from '../constants/auth';

export function apiSignUp(data) {
  return Api.post('users', { params: data });
}

export function apiLogin(data) {
  return Api.post('users/login', { params: data });
}

export function authenticate({ token, user }) {
  return {
    type: AUTHENTICATE,
    token,
    user,
  };
}
