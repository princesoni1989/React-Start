import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isRequired, lessThan, validateEmail, formatDatetoDDMMYY, getTodaysDate} from '../../../util/validations';
import {Link} from 'react-router';
import {signUpNewUser} from '../../../actions/authentication';
import './style.scss';

class SignUp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputFields: ['name', 'email', 'password'],
      onSubmit: false,
      type: 'password',
    };
  }

  changeHandler = (value, property, changed = 'true')=> {
    this.setState({
      [property]: {
        value,
        changed,
      },
    });
  }

  showHandler = () => {
    let inputType = "";
    if (this.state.type === 'password')
      inputType = 'text';
    else
      inputType = 'password';
    this.setState({
      type: inputType,
    });
  }

  handleSignUp = () => {
    this.setState({
      onSubmit: true,
    });
  }


  render () {
    const {email, fullName, password, age, location, onSubmit, type}=this.state;
    return (
      <div className='signup-form'>
        <div className='seperator-line'>
          <h1 className="heading">Sign Up For Free</h1>
        </div>
        <ul>
          <li className='form-group'>
            <input className='form-control' type='text' placeholder='Full Name'
                   onChange={(e)=>this.changeHandler(e.target.value,'name',true)} required />
            <p className='form-group text-danger'>
            </p>
          </li>

          <li className='form-group'>
            <input className='form-control' type='text' placeholder='Email Address'
                   onChange={(e)=>this.changeHandler(e.target.value,'email',true)} required />
            <p className='form-group text-danger'>
            </p>
          </li>

          <li className='form-group'>
            <input className='form-control' type={type} placeholder='Password'
                   onChange={(e)=>this.changeHandler(e.target.value,'password',true)} required />
            <span className='show-password' onClick={this.showHandler}>SHOW</span>
            <p className='form-group text-danger'>
            </p>
          </li>
          <li className='form-group txt-center'>
            <button className='btn-default' onClick={this.handleSignUp}>Sign Up</button>
          </li>

          <li className='form-group txt-center'>
            <Link to='/login' className='form-link'>Already a member? <span>Login</span></Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    signup: state.signup,
  };
};

function mapDispatchToProps (dispatch) {
  return ({
    signUpNewUser: (firstName, lastName, email, password, birthdate, location) => {
      dispatch(signUpNewUser(firstName, lastName, email, password, birthdate, location));
    },
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

