const robot = require('robotjs');
const net = require('net');

const height = robot.getScreenSize().height;
const width = robot.getScreenSize().width;

const server = net.createServer((socket) => {
	var ndx, ndy, temp;
	var mouse;
	console.log('client connected');

	socket.on('data', (data) => {
		temp = data.toString().split(',');
		ndx = parseFloat(temp[0]);
		ndy = parseFloat(temp[1]);
		
		mouse = robot.getMousePos();
		robot.moveMouse(width * ndx, height * ndy);
	});
});

server.listen(4567, () => {
    console.log('opened server on', server.address());
});
