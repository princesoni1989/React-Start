import {
  LOGIN,
  SIGNUP,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants';
import { mergeDefault } from '../util/helper';
import callApi from '../util/apiCaller';

function success (response) {
  return {
    type: LOGIN_SUCCESS,
    response,
  };
}

function failure (error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export default function login (params, data) {
  return dispatch => {
    return callApi({
        path: params.path,
        method: params.method,
        body: data,
      }
    )
      .then((response) => {
          dispatch(success(response));
      });
  };
}

