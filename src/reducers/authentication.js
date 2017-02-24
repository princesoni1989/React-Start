import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../constants';

const initialState = {
  status: false,
};

const authentication = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state, status: true, data: action.response,
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state, status: false, data: action.response,
      };
    default:
      return state;
  }
};
export default authentication;
