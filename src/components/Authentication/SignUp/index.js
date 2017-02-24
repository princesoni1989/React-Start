import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUp} from '../../../actions/authentication';
import {bindActionCreators} from 'redux';
import {Link, browserHistory} from 'react-router';
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
      [property]: value,
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
    let {name, email, password} =  this.state;
    this.props.userSignUp({name, email, password});

  }


  render () {
    const {signup} = this.props;
    if(signup)
      browserHistory.push('/users');
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
    signup: state.authentication.status,
  };
};

function mapDispatchToProps (dispatch) {
  return ({
    userSignUp: bindActionCreators(signUp, dispatch),
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

