import { MESSAGE_PUSHED, MESSAGES_PUSHED_TO_STORE, SEND_CHART_DATA } from '../actions/types';

const initialState = {
	messages: [],
	chartData: []
};

const sockets = (state = initialState, action) => {
	switch (action.type) {
		case MESSAGE_PUSHED:
			return {
				...state,
				...action.payload
			};
		case MESSAGES_PUSHED_TO_STORE:
			return {
				...state,
				messages: action.payload
			}
		case SEND_CHART_DATA:
			return {
				...state,
				chartData: action.payload
			};
		default:
			return state;
	}
};

export default sockets;
