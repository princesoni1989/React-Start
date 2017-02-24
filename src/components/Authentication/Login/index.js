import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {isRequired, lessThan, validateEmail} from '../../../util/validations';
import login from '../../../actions/authentication';
import {connect} from 'react-redux';
import {Link} from 'react-router';
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
      if (email.value.length === 0 || password.value.length < 6) {
        this.setState({onSubmit: true});
        return false;
      }
      else {
        this.props.userLogin(endpoints.login, {
          email: email.value,
          password: password.value,
        });
      }
    };

    let message = '';
    if (this.props.login.error != '') {
      message = this.props.login.error;
    }
    return (
      <div className='login-form-container'>

        <div className='seperator-line'>
          <span>OR</span>
        </div>
        <p className='form-group text-danger'>
          {message}
        </p>
        <ul className='login-form'>
          <li className='form-group'>
            <input className='form-control' id='email' type='email' name='email' placeholder='Email' ref='email'
                   onChange={(e) => this.changeHandler(e.target.value, 'email', true)} required />
            <p className='form-group text-danger'>
              {email.changed && !validateEmail(email.value) && 'Enter a valid email address.'}
              {onSubmit && !isRequired(email.value) && 'Mandatory Field.'}
            </p>
          </li>
          <li className='form-group'>
            <input className='form-control' id='password' type={this.state.type} name='password' placeholder='Password' ref='password'
                   onChange={(e) => this.changeHandler(e.target.value, 'password', true)} required />
            <span className='show-password' onClick={showPassword}>SHOW</span>
            <p className='form-group text-danger'>
              {password.changed && !lessThan(password.value, 6) && 'Password must be 6 characters long.'}
              {onSubmit && !isRequired(password.value) && 'Mandatory Field.'}
            </p>
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
    login: state.authentication.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: bindActionCreators(login, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
