import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
} from '../constants';

const initialState = {
  login: {
    isLogin: false,
    message: '',
  },
  signup: {
    data: [],
  },
};

const authentication = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          isLogin: true,
          message: action.response,
        },
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        login: {
          isLogin: false,
          error:action.error,
        },
      };
    case SIGNUP:
      return {
        ...state,
        signup: {
          data: action.payload.data,
        },
      };
    default:
      return state;
  }
};
export default authentication;
