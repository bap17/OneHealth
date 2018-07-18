import React from 'react'
import ApiKurento from './servicios/apiKurento.js'
import io from 'socket.io-client';

class ComponenteKurento extends React.Component {

	constructor() {
        super()


        this.registro = this.registro.bind(this);
        this.init = this.init.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }


	init() {


		new ApiKurento().init1().then(function(datos){

			if(datos.status==200) {
				console.log("bien 204")
			} else {
				console.log("mal otra cosa diferente a 200")
			}
		})


	}

	registro() {

		var mythis = this
		var name = this.name.value
		console.log(location.host)
		var message = {
			id : 'register',
			name : name
		};


		/*var jsonMessage = JSON.stringify(message);
		console.log('Senging message: ' + jsonMessage);
		this.ws.send(jsonMessage);*/
		var connectionOptions = {
			"force new connection": true,
			"reconnectionAttempts": "Infinity",
			"timeout": 10000,
			"transports": ["websocket"]
		}

      	const socket = io.connect("https://localhost:3000", connectionOptions);
		socket.emit('message', 'Hello world!');


	}

	sendMessage(message) {
		var jsonMessage = JSON.stringify(message);
		console.log('Senging message: ' + jsonMessage);
		this.ws.send(jsonMessage);
	}


    render() {
        return <div>
            <div className="regis">
				<span>Usuario: </span>  <br></br>
				<input id="user" className="input" ref={(campo)=>{this.name=campo}}></input> <br></br>
				<button id="registro" onClick={this.registro} className="button">Registrar</button>  <br></br> <br></br>
				<button id="inicio" onClick={this.init} className="button">Iniciar</button>  <br></br> <br></br>
			</div>
        </div> 
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteKurento