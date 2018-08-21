import React from 'react'
import Api from './servicios/api.js'
import Peer from 'simple-peer'
import $ from 'jquery'
import css from '../css/mystyle.css';
import Webcam from 'react-webcam';
import io from 'socket.io-client';

var peer = null
var initiator = null
var connect = null
var signal_input = null

class ComponenteWebRTCSimple extends React.Component {


	constructor(props) {
        super(props)
        this.state = {
            myID:"",
            messages: "",
            stream: null,
            videoSrc:null,
            videoRemoteSrc:null,
            idPac: this.props.idPaciente,
            TypeUser: this.props.user,
            aux: this.props.infoAux
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.initiater = this.initiater.bind(this);
        this.connect = this.connect.bind(this);
        this.send = this.send.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
        this.videoError = this.videoError.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
    	var mythis = this
    	var connectionOptions = {
			"force new connection": true,
			"reconnectionAttempts": "Infinity",
			"timeout": 10000,
			"transports": ["websocket"]
		}
		
    	
    	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
	    if (navigator.getUserMedia) {
	        navigator.getUserMedia({video: true},this.handleVideo, this.videoError);
	    }
	    var idUsu = localStorage.getItem('id');
		this.socket = io.connect("https://localhost:3000", connectionOptions);
		this.socket.on('connect', function() {
			mythis.socket.on('Response'+ idUsu, function(message) {
				console.log('Estoy en la vuelta: ')
				console.log(message) ;
				mythis.setState({aux: message})
				mythis.connect()
			})
		})

	    if(this.state.TypeUser == "Response") {
	    	this.connect()
	    }


    }

	sendMessage(msg) {
		console.log("estoy enviando cosas al servidor con la info ")
		console.log(msg)
		this.socket.emit("message", msg);
	}

    initiater() {
    	var idUsu = localStorage.getItem('id');
    	var username = localStorage.getItem('username');
    	var mythis = this
    	peer = Peer({trickle: false, initiator: true, stream: this.state.stream})

		peer.on('signal', (data) => {
		  console.log('peer signal', data)
		  mythis.setState({myID:JSON.stringify(data)})
		 
		  	var message = {
			  	"id": "userToken",
			  	"name": username,
			  	"iniciador": idUsu,
			  	"userRemote": mythis.state.idPac,
			  	"token": mythis.state.myID
			  }

		  
		  
		  mythis.sendMessage(message)
		 
		})
    }

    connect() {
    	var idUsu = localStorage.getItem('id');
    	var username = localStorage.getItem('username');
    	var mythis = this
    	var message = null
    	var auxID
    	if (peer === null) {
		    peer = Peer({trickle: false, stream: this.state.stream})
		    peer.on('signal', (data) => {
		      //console.log('peer signal', data)
		      auxID = JSON.stringify(data)

		      mythis.setState({myID:JSON.stringify(data)})

		      if(mythis.state.TypeUser == "Response") {

			      	message = {
					  	"id": "reponseToken",
					  	"name": username,
					  	"iniciador": mythis.state.aux.iniciador,
					  	"userRemote": idUsu,
					  	"token": mythis.state.myID
					}

					mythis.sendMessage(message)
					 
			    }

		    })
		    	
		    
		}
		console.log("Este es el aux ID")
		console.log(auxID)
		//var data = this.campoOtherID.value
		console.log("info llamada: ")
		//console.log(this.state.aux)
		var data = this.state.aux.token
		console.log(data)
		peer.signal(data)

		peer.on('connect', () => {
			console.log('peer connected')
		})
		peer.on('data', (data) => {
			const message = data.toString('utf-8')
			console.log('peer received', message)
			this.setState({messages: this.state.messages.concat("\n USERX:"+message)})
		})
		peer.on('stream', (stream) => {
			console.log("Send stream")
			this.handleVideoRemote(stream)
		})
		peer.on('error', (error) => {
			console.error('peer error', error)
		})
		peer.on('close', () => {
			console.log('peer connection closed')
		})

		
		
    }

    send() {
    	var mesg = this.campoMessage.value
    	this.setState({messages: this.state.messages.concat("\n \t USERX: "+mesg)})
    	peer.send(mesg)
    	$('#yourMessage').val('');
    }

    handleVideoRemote(str) {	

    	this.setState({ videoRemoteSrc: window.URL.createObjectURL(str) });
    }


    handleVideo(str) {	
    	this.setState({ stream: str });

    	this.setState({ videoSrc: window.URL.createObjectURL(str) });
    }

    videoError() {

    }

    render() {
        return <div>
        			<div className="boxMyID">
	        			<span>Mi ID: </span>
	        			<div className="containerMyID"><p id="myId"  ref={(campo)=>{this.campoMyID=campo}} className="myID">{this.state.myID}</p><div className="clear"></div></div>
						<button id="getID" onClick={this.initiater} className="button button-call">Llamar</button> <br></br>  <br></br>
					</div>
					<div className="boxYourId">
						<span>Otra ID:</span>  <br></br>
						<input id="otherId" className="input" ref={(campo)=>{this.campoOtherID=campo}}></input> <br></br>
						<button id="connect" onClick={this.connect} className="button">Conectar</button>  <br></br> <br></br>
					</div>
					<div className="boxVideo">
						<video src={this.state.videoSrc} autoPlay="true" />
						<video src={this.state.videoRemoteSrc} autoPlay="true" />
					</div>
					<div className="boxMessages">
						<span> Mensajes: </span> <br></br>
						<pre id="messages" >{this.state.messages}</pre>
						<input id="yourMessage" ref={(campo)=>{this.campoMessage=campo}} className="input" ></input> <br></br>
						<button id="send" onClick={this.send} className="button">Enviar</button> <br></br>
					</div>
					
					
				</div>
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteWebRTCSimple