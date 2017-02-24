import {
  GET_USERS,
} from '../constants';

const initialState = {
  userList: [],
};

const users = function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      return {
          userList: action.response,
      };
    }
    default:
      return state;
  }
};
export default users;
