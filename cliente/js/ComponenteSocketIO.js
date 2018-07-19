import io from 'socket.io-client';

var connectionOptions = {
	"force new connection": true,
	"reconnectionAttempts": "Infinity",
	"timeout": 10000,
	"transports": ["websocket"]
}

this.socket = io.connect("https://localhost:3000", connectionOptions);


function subscribe(cb) {
  socket.on('messageC', function() {
  	console.log("llegue")
  })
  socket.emit('message', "hola");
}

function send(destino, message) {
	socket.emit(destino, message);
}

export { subscribe };
export { send };