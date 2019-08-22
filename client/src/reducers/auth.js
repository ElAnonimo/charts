import { LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
	isAuthenticated: false
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			// console.log('action.payload from auth reducer:', action.payload);
			console.log('action.payload from auth reducer:', {...state, ...action.payload	});
			return {
				...state,
				...action.payload			// action.payload === { isAuthenticated: true }
				// isAuthenticated: action.payload
			};
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false
			};		
		default:
			return state;
	}
};

export default auth;
