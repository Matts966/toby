import { AUTHENTICATE, LOGOUT } from '../constants/auth';

const initialState = {
  token: null,
  me: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      const { token, user } = action;

      return {
        ...state,
        token,
        me: user,
      };
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
