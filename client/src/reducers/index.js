import { combineReducers } from 'redux';
import auth from './auth';
import sockets from './sockets';

export default combineReducers({
	auth,
	sockets
});
