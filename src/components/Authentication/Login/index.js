import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {isRequired, lessThan, validateEmail} from '../../../util/validations';
import login from '../../../actions/authentication';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import endpoints from '../../../endpoints/authentication';

import './style.scss';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputFields: ['email', 'password'],
      onSubmit: false,
      type: 'password',

    };
  }

  componentWillMount () {
    const {inputFields}=this.state;
    inputFields.map((input) => {

      let value = '';
      if (input === 'location')
        value = 'Select Location';

      this.setState({
        [input]: {
          value,
          changed: false,
        },
      });
    });
  }

  changeHandler = (value, property, changed = 'true') => {
    this.setState({
      [property]: {
        value,
        changed,
      },
    });
  };

  render () {
    const {login} = this.props;
    console.log("login", login);
    if(login)
      browserHistory.push('/users');

    const {email, password, onSubmit, type}=this.state;
    const showPassword = () => {
      let inputType = "";
      if (type === 'password')
        inputType = 'text';
      else
        inputType = 'password';
      this.setState({
        type: inputType,
      });
    };
    const handleLogin = () => {
        this.props.userLogin({
          email: email.value,
          password: password.value,
        });
    };

    return (
      <div className='login-form-container'>

        <div className='seperator-line'>
          <span>OR</span>
        </div>
        <p className='form-group text-danger'>
        </p>
        <ul className='login-form'>
          <li className='form-group'>
            <input className='form-control' id='email' type='email' name='email' placeholder='Email' ref='email'
                   onChange={(e) => this.changeHandler(e.target.value, 'email', true)} required />
          </li>
          <li className='form-group'>
            <input className='form-control' id='password' type={this.state.type} name='password' placeholder='Password' ref='password'
                   onChange={(e) => this.changeHandler(e.target.value, 'password', true)} required />
            <span className='show-password' onClick={showPassword}>SHOW</span>
          </li>
          <li className='form-group txt-center'>
            <button className='btn-default' onClick={() => handleLogin()}>Login</button>
          </li>
          <li className='form-group txt-center'>
            <Link to='/signup' className='form-link'>Not a member yet? <span>Register</span></Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: bindActionCreators(login, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
