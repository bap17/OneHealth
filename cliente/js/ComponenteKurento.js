import React from 'react'
import ApiKurento from './servicios/apiKurento.js'
import io from 'socket.io-client';
var kurentoUtils = require('kurento-utils');


class ComponenteKurento extends React.Component {

	constructor() {
        super()
        this.registro = this.registro.bind(this);
        this.call = this.call.bind(this);
        this.resgisterResponse = this.resgisterResponse.bind(this);
        this.callResponse = this.callResponse.bind(this);
        this.onIceCandidate = this.onIceCandidate.bind(this); 
        this.incomingCall = this.incomingCall.bind(this); 
        this.callResponse = this.callResponse.bind(this); 
        this.startCommunication = this.startCommunication.bind(this);
        this.stop = this.stop.bind(this);
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
		console.log(this.socket)
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
				case 'callResponse':
					mythis.callResponse(message);
					break;
				case 'incomingCall':
					//console.log("incommingCall")
					mythis.incomingCall(message);
					break;
				case 'startCommunication':
					console.log("startCommunication")
					startCommunication(parsedMessage);
					break;
				case 'stopCommunication':
					console.info("Communication ended by remote peer");
					stop(true);
					break;
				case 'iceCandidate':
					webRtcPeer.addIceCandidate(parsedMessage.candidate)
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

	call() {

		console.log("entro a la funcion llamar")
		var videoInput = this.videoIn.value
		var videoInput = this.videoOut.value
		var auxFrom = this.name.value
		var auxTo = this.peer.value
		var mythis = this

		var options = {
			localVideo : videoInput,
			remoteVideo : videoOutput,
			onicecandidate : this.onIceCandidate
		}

		this.webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(
				error) {
			if (error) {
				console.error(error);
				//setCallState(NO_CALL);
			}

			this.generateOffer(function(error, offerSdp) {
				if (error) {
					console.error(error);
					//setCallState(NO_CALL);
				}
				var message = {
					id : 'call',
					from : auxFrom,
					to : auxTo,
					sdpOffer : offerSdp
				};
				mythis.socket.emit('message', message);
			});
		});
	}

	onIceCandidate(candidate) {
		var mythis = this
		//console.log("entro a la funcion oncandidate")
		//console.log('Local candidate' + JSON.stringify(candidate));

		var message = {
			id : 'onIceCandidate',
			candidate : candidate
		}
		mythis.socket.emit('message', message);
	}


	callResponse(message) {
		console.log("----------entro a callResponse")
		if (message.response != 'accepted') {
			console.info('Call not accepted by peer. Closing call');
			var errorMessage = message.message ? message.message
					: 'Unknown reason for call rejection.';
			console.log(errorMessage);
			stop(true);
		} else {
			//setCallState(IN_CALL);
			this.webRtcPeer.processAnswer(message.sdpAnswer);
		}
	}

	resgisterResponse(message) {
		console.log("registerResponse function")
	}

	incomingCall(message) {

		var videoInput = this.videoIn.value
		var videoInput = this.videoOut.value
		var mythis = this

		// If bussy just reject without disturbing user
		/*if (callState != NO_CALL) {
			var response = {
				id : 'incomingCallResponse',
				from : message.from,
				callResponse : 'reject',
				message : 'bussy'

			};
			//return sendMessage(response);
		}*/

		//setCallState(PROCESSING_CALL);

		//Comprobar que es para mi la llamada
		console.log("llego aqui")
		if(message.from != this.name.value) {
			if (confirm('User ' + message.from
				+ ' is calling you. Do you accept the call?')) {
				//showSpinner(videoInput, videoOutput);

				var options = {
					localVideo : videoInput,
					remoteVideo : videoOutput,
					onicecandidate : this.onIceCandidate
				}

				this.webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
						function(error) {
							console.log("estoy dentro de webrtcPeer")
							if (error) {
								console.log("!!!!!!!ERROR ¡¡¡¡¡¡¡¡¡ estoy dentro de webrtcPeer")
								console.error(error);
								//setCallState(NO_CALL);
							}

							this.generateOffer(function(error, offerSdp) {
								if (error) {
									console.log("!!!!!!!ERROR 2¡¡¡¡¡¡¡¡¡ estoy dentro de webrtcPeer")
									console.error(error);
									//setCallState(NO_CALL);
								}
								var response = {
									id : 'incomingCallResponse',
									from : message.from,
									callResponse : 'accept',
									sdpOffer : offerSdp
								};
								//sendMessage(response);
								mythis.socket.emit('message', response);
							});
						});

			} else {
				var response = {
					id : 'incomingCallResponse',
					from : message.from,
					callResponse : 'reject',
					message : 'user declined'
				};
				//sendMessage(response);
				mythis.socket.emit('message', response);
				stop(true);
			}
		}
		
	}


	callResponse(message) {
		if (message.response != 'accepted') {
			console.info('Call not accepted by peer. Closing call');
			var errorMessage = message.message ? message.message
					: 'Unknown reason for call rejection.';
			console.log(errorMessage);
			stop(true);
		} else {
			//setCallState(IN_CALL);
			this.webRtcPeer.processAnswer(message.sdpAnswer);
		}
	}

	startCommunication(message) {
		//setCallState(IN_CALL);
		this.webRtcPeer.processAnswer(message.sdpAnswer);
	}


	stop(message) {
		var mythis = this
		//setCallState(NO_CALL);
		if (webRtcPeer) {
			webRtcPeer.dispose();
			webRtcPeer = null;

			if (!message) {
				var message = {
					id : 'stop'
				}
				mythis.socket.emit('message', message);
			}
		}
		//hideSpinner(videoInput, videoOutput);
	}

    render() {
        return <div>
            <div className="regis">
				<span>Usuario: </span>  <br></br>
				<input id="user" className="input" ref={(campo)=>{this.name=campo}}></input> <br></br>
				<button id="registro" onClick={this.registro} className="button">Registrar</button>  <br></br> <br></br>
			</div>
			<div className="call">
				<span>Usuario: </span>  <br></br>
				<input id="peer" className="input" ref={(campo)=>{this.peer=campo}}></input> <br></br>
				<button id="call" onClick={this.call} className="button">Llamar</button>  <br></br> <br></br>
			</div>
			<div className="clear"></div>
			<div className="videos">
	          <div className="videoBig">
	            <video id="videoOutput" autoPlay width="640px" height="480px" ref={(campo)=>{this.videoOut=campo}}></video>
	          </div>
	          <div className="clear"></div>
	          <div className="videoSmall">
	            <video id="videoInput" autoPlay width="240px" height="180px" ref={(campo)=>{this.videoIn=campo}}></video>
	          </div>
	        </div>
        </div> 
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteKurento