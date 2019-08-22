const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const authRoute = require('./routes/api/auth');

app.use(cors());
app.use(express.json({ extended: false }));

// define routes
app.use('/api/auth', authRoute);

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  express.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000;

const messages = [
	{ id: 1, msg: "hello app" }
];

const chartData = [
	{ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) },
	{ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) },
	{ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) }
];

io.on('connection', socket => {
	console.log('a client has connected to socket.io');
	
	socket.emit('messages', messages);
	socket.emit('chartData', chartData);
	
	socket.on('new-message', msg => {
		messages.push(msg);
		io.sockets.emit('messages', messages);
	});
});

server.listen(8080, () => console.log('socket.io server is listening on port 8080'));

app.listen(PORT, () => console.log(`Biocad server is listening on port ${PORT}`));
