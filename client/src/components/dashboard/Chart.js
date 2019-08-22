import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
// import { getSocketMessages } from '../../actions/sockets';
import socket from '../../utils/wsConnection';

// const socket = socketIOClient('http://localhost:8080');

// const Chart = ({ isAuthenticated, messages, getSocketMessages }) => {
const Charts = ({ isAuthenticated, messages, chartData }) => {
	const [formData, setFormData] = useState({
		message: ''
	});
	
	console.log('messages from Chart.js:', messages);
	console.log('chartData from Chart.js:', chartData);
	
	// const [messages, setMessages] = useState([]);
	
	const { message } = formData;
	
	const chartRef = useRef();
	
	// const socket = socketIOClient('http://localhost:8080');
	
	/* useEffect(() => {
		// const socket = socketIOClient('http://localhost:8080');
		socket.on('messages', messages => {
			console.log('messages in Chart.js:', messages);
			setMessages(messages);
			// console.log('messages from useEffect() in Chart.js:', messages);
		});
	}, []); */
	
	useEffect(() => {
		const chart = chartRef && new Chart(document.getElementById('myChart'), {
			type: 'line',
			data: [{
					x: 10,
					y: 20
			}, {
					x: 15,
					y: 10
			}],
			options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
		});
	}, [chartData]);
	
	// redirect to /login if not logged in
	if (!isAuthenticated) {
		return <Redirect to='/login' />
	}
	
	const onChange = evt => setFormData({
		...formData,
		[evt.target.name]: evt.target.value
	});
	
	const onSubmit = evt => {
		console.log('message from onSubmit in Chart.js:', message);
		evt.preventDefault();
		socket.emit('new-message', { id: uuid.v4(), msg: message });
		// getSocketMessages(message);
	};
	
	
	
	return (
		<Fragment>
			<div>Chart Component</div>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						name='message'
						placeholder='enter message'
						value={message}
						onChange={onChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Send' />
			</form>
			<h3 className='lead text-dark my-1'>Websockets Messages</h3>
			<div>{messages.map(msg => <p key={msg.id} className='lead m-0'>{msg.msg}</p>)}</div>
			<canvas ref={chartRef} id='myChart' width='400' height='400'></canvas>
		</Fragment>
	);
};

Chart.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
	console.log('state from Chart.js:', state);
	
	return {
		isAuthenticated: state.auth.isAuthenticated,
		messages: state.sockets.messages,
		chartData: state.sockets.chartData
	}
};

// export default connect(mapStateToProps, { getSocketMessages })(Chart);
export default connect(mapStateToProps)(Charts);
