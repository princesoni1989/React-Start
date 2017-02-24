/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Landing from './components/Landing';
import Login from './components/Authentication/Login/';
import SignUp from './components/Authentication/SignUp';
import Users from './components/Users';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule (deps, callback) {
    callback(require);
  };
}


// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path='/' component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, Landing);
        });
      }}
    />
    <Route
      path='/login'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, Login);
        });
      }}
    />
    <Route
      path='/signup'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, SignUp);
        });
      }}
    />
    <Route
      path='/users'
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, Users);
        });
      }}
      />
  </Route>
);
