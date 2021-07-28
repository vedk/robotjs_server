const robot = require('robotjs');
const net = require('net');

const twoPI = Math.PI * 2.0;
const screenSize = robot.getScreenSize();
const height = screenSize.height;
const width = screenSize.width;

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

/*
for (var x = 0; x < width; x++) {
	y = height * Math.sin((twoPI * x)/width) + height;
	robot.moveMouse(x, y);
}
*/
