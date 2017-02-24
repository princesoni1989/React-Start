import {
  GET_USERS,
} from '../constants';
import {mergeDefault} from '../util/helper';
import callApi from '../util/apiCaller';

function users (response) {
  return {
    type: GET_USERS,
    response,
  };
}

export default function fetch (params, data) {
  return dispatch => {
    return callApi({
        path: params.path,
        method: params.method,
        body: data,
      }
    )
      .then((response) => {
        dispatch(users(response));
      });
  };
}

