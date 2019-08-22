import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	
	const { username, password } = formData;
	
	const onChange = evt => setFormData({
		...formData,
		[evt.target.name]: evt.target.value
	});
	
	const onSubmit = evt => {
		evt.preventDefault();
		login(username, password);
	};
	
	// redirect to /chart if logged in
	if (isAuthenticated) {
		return <Redirect to='/charts' />
	}
	
	return (
		<Fragment>
      <h1 className='large text-primary'>Log In</h1>
      <p className='lead'><i className='fas fa-user' /> Log In With Your Credentials</p>
      <form className='form' onSubmit={evt => onSubmit(evt)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='User Name'
            name='username'
            value={username}
            onChange={evt => onChange(evt)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='5'
            value={password}
            onChange={evt => onChange(evt)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
    </Fragment>
	)
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
