import {
  GET_USERS,
} from '../constants';
import endpoints from '../endpoints/authentication';
import callApi from '../util/apiCaller';

function users (response) {
  return {
    type: GET_USERS,
    response,
  };
}

export default function fetchUsers () {
  return dispatch => {
    return callApi({
        path: endpoints.users.path,
        method: endpoints.users.method,
      }
    )
      .then((response) => {
        dispatch(users(response));
      });
  };
}

