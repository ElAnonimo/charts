import socketIOClient from 'socket.io-client';
import { sendMessagesToStore } from '../actions/sockets';
import { sendChartData } from '../actions/sockets';
import store from '../store';

const socket = socketIOClient('http://localhost:8080');

socket.on('messages', messages => {
	console.log('messages in wsConnection.js:', messages);
	
	store.dispatch(sendMessagesToStore(messages));
	
	console.log('store state from wsConnection.js:', store.getState());
	// console.log('messages from useEffect() in Chart.js:', messages);
});

socket.on('chartData', chartData => {
	store.dispatch(sendChartData(chartData));
});

export default socket;
