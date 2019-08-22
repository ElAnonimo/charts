import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/charts' />
	}
	
	console.log('isAuthenticated from Landing:', isAuthenticated);
	
	return (
		<div className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Biocad Charts</h1>
					<p className='lead'>
						This app was designed to put your charts on the screen
					</p>
					<div className='buttons'>
						<Link to='/login' className='btn btn-light'>Login</Link>
					</div>
				</div>
			</div>
		</div>
	)
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
