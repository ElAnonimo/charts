import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Login from '../auth/Login';
import Charts from '../dashboard/Chart';

const Routes = () => (
	<div className='container'>
		<Switch>
			<Route path='/login' component={Login} />
			<Route path='/charts' component={Charts} />
			<Route component={NotFound} />
		</Switch>
	</div>
);

export default Routes;
