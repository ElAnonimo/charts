import { LOGIN_SUCCESS, LOGOUT } from './types';

// log in user
export const login = (username, password) => async dispatch => {	
	const body = JSON.stringify({ username, password });
	
	const res = await fetch('/api/auth', {
		method: 'POST',
		body: body,
		headers: new Headers({ 'Content-Type': 'application/json' })
	});
	
	console.log('res from login() action:', res);
	
	const data = await res.json();
	console.log('data from login() action:', data);
	
	dispatch({
		type: LOGIN_SUCCESS,
		payload: data
	});
};

// log user out
export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT
	});
};
