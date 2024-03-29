import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
	const authLinks = (
    <ul>
      <li>
        <Link to='/'>Home</Link>
        <Link to='/charts'>Charts</Link>
      </li>
      <li>
        <Link to='#!' onClick={logout}>
          <i className='fas fa-sign-out-alt' /> <span className='hide-sm'>Log Out</span>
        </Link>
      </li>
    </ul>
  );
	
	const guestLinks = (
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  );
	
	return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'><i className='fas fa-code' /> Biocad Charts</Link>
      </h1>
      { <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);