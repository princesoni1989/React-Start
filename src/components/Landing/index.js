import React, {Component} from 'react';
import {Link} from 'react-router';
import './style.scss';

class Landing extends Component {
  render () {
    return (
      <div className='container'>
        <div className='main-container'>
          <div className='home-container'>
            <Link to='/login' className='form-link'>Login</Link>
            <Link to='/signup' className='form-link'>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
