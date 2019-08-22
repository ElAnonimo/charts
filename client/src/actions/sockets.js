import socketIOClient from 'socket.io-client';
import uuid from 'uuid';
import { MESSAGE_PUSHED, MESSAGES_PUSHED_TO_STORE, SEND_CHART_DATA } from './types';

const socket = socketIOClient('http://localhost:8080');

/* socket.on('messages', messages => {
	console.log('messages in sockets.js:', messages);
	// setMessages(messages);
	// console.log('messages from useEffect() in Chart.js:', messages);
}); */

// push message to sockets
/* export const getSocketMessages = (message) => (dispatch) => {
	console.log('message from getSocketMessages() action:', message);
	const messages = [];
	
	socket.emit('new-message', { id: uuid.v4(), msg: message });
	
	socket.on('messages', messages => {
		messages.concat(messages);
		// io.sockets.emit('messages', messages);
		console.log('messages from getSocketMessages() action:', messages);
	});
	
	dispatch({
		type: MESSAGE_PUSHED,
		payload: messages
	});
}; */

export const sendMessagesToStore = messages => {
	console.log('messages in sendMessagesToStore action', messages);
	
	return {
		type: MESSAGES_PUSHED_TO_STORE,
		payload: messages
	}
};

export const sendChartData = chartData => {
	return {
		type: SEND_CHART_DATA,
		payload: chartData
	};
};
