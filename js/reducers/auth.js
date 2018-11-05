import { AUTHENTICATE } from '../constants/auth';

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
    default:
      return state;
  }
};

export default authReducer;
