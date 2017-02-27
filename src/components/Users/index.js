import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fetchUsers from '../../actions/users';
import {browserHistory} from 'react-router';

import './style.scss';
class SignUp extends Component {
  componentDidMount () {
    this.props.getUsers();
  }

  logOut = () => {
    browserHistory.push('/login');
  }
  render () {
    let {users} = this.props;
    return (
      <div>
        <a onClick={this.logOut}>Logout</a>
        <table className='users'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

SignUp.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: bindActionCreators(fetchUsers, dispatch),
  };
};

SignUp.need = [
  fetchUsers,
];

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

