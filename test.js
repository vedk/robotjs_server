const robot = require('robotjs');
const net = require('net');

const height = robot.getScreenSize().height;
const width = robot.getScreenSize().width;

const server = net.createServer((socket) => {
	var ndx, ndy,temp;
	var mouse;
	console.log('client connected');

	socket.on('data', (data) => {
		var temp = data.toString();
		temp = temp.substring(temp.search("{"),temp.search("}")+1);
		console.log(temp);
		try {
			const obj = JSON.parse(temp);
			ndx = obj.dx;
			ndy = obj.dy;
			mouse = robot.getMousePos();
			switch (obj.action) {
				case "click":
					robot.mouseClick();
					break;
				case "move":
					robot.moveMouse(width * ndx, height * ndy);
					break;
				case "drag":
					robot.mouseToggle("down");
					robot.dragMouse(width * ndx, height * ndy);
					robot.mouseToggle("up");
					break;
			}
		} catch (error) {
			console.log(error)
		}
		
		
	});
});

server.listen(4567, () => {
    console.log('opened server on', server.address());
});
