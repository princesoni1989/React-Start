import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fetch from '../../actions/users';
import endpoints from '../../endpoints/users';


class SignUp extends Component {
  componentDidMount () {
    this.props.getUsers(endpoints.users)
  }
  render () {
    let {users} = this.props
    return (
      <table className='users'>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
          </tr>
        </thead>
        {users.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          )
        })}
      </table>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users.userList,
  };
};

function mapDispatchToProps (dispatch) {
  return {
    getUsers: bindActionCreators(fetch, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

