import React from 'react'
import ApiKurento from './servicios/apiKurento.js'
import io from 'socket.io-client';



class ComponenteKurento extends React.Component {

	constructor() {
        super()


        this.registro = this.registro.bind(this);
        this.resgisterResponse = this.resgisterResponse.bind(this);



    }



	componentDidMount() {
		var connectionOptions = {
			"force new connection": true,
			"reconnectionAttempts": "Infinity",
			"timeout": 10000,
			"transports": ["websocket"]
		}
		var mythis =this;

		this.socket = io.connect("https://localhost:3000", connectionOptions);
		this.socket.on('connect', function() {
			mythis.socket.on('messageC', function(message) {
				var uu =message.id.toString()
				console.log('Received message: ')
				console.log(message) ;
				console.log(message.id.toString())

				switch (uu) {
				case 'registerResponse':
					mythis.resgisterResponse(message);
					break;
				default:
					console.log('Unrecognized message', message);
				}
		  	})
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
		
		this.socket.emit('message', message);


	}

	resgisterResponse(message) {
		console.log("registerResponse function")
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