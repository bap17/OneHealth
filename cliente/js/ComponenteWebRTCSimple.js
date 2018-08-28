import React from 'react'
import Api from './servicios/api.js'
import Peer from 'simple-peer'
import $ from 'jquery'
import css from '../css/mystyle.css';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var peer = null
var initiator = null
var connect = null
var signal_input = null

var mediaRecorder = null
var recordedBlobs = null
var sourceBuffer = null


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
            aux: this.props.infoAux,
            socket: this.props.socket
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.initiater = this.initiater.bind(this);
        this.connect = this.connect.bind(this);
        this.send = this.send.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
        this.videoError = this.videoError.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.colgarLlamada = this.colgarLlamada.bind(this);

       // this.record = this.record.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.download = this.download.bind(this);
        this.handleSourceOpen = this.handleSourceOpen.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleDataAvailable = this.handleDataAvailable.bind(this);
        this.play = this.play.bind(this);


        
    }

    componentDidMount() {

    	var mythis = this
    	var connectionOptions = {
			"force new connection": true,
			"reconnectionAttempts": "Infinity",
			"timeout": 10000,
			"transports": ["websocket"]
		}
		
    	document.getElementById("gum").poster = "./../img/medicoAzul.png"; 
    	document.getElementById("video1").poster = "./../img/medicoRojo.png"; 

    	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
	    if (navigator.getUserMedia) {
	        navigator.getUserMedia({video: true},this.handleVideo, this.videoError);
	        
	    }
	    var idUsu = localStorage.getItem('id');
		this.state.socket.on('Response'+ idUsu, function(message) {
			console.log('Estoy en la vuelta: ')
			console.log(message) ;
			mythis.setState({aux: message})
			mythis.connect()
		})


		this.mediaSource = new MediaSource();
		this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);   
		this.recordedVideo = document.querySelector('video#recorded');
		this.recordButton = document.querySelector('button#record');
		this.playButton = document.querySelector('button#play');
		this.downloadButton = document.querySelector('button#download');




    }

	sendMessage(msg) {
		console.log("estoy enviando cosas al servidor con la info ")
		console.log(msg)
		//this.socket.emit("message", msg);
		this.state.socket.emit("message", msg)
	}

    initiater() {
    	console.log("estoy en initiater")
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

		$('#call').addClass('hiden')
		$('#colgar').removeClass('hiden')
    }

    connect() {
    	$('#call').addClass('hiden')
		$('#colgar').removeClass('hiden')
    	var idUsu = localStorage.getItem('id');
    	var username = localStorage.getItem('username');
    	var mythis = this
    	var message = null
    	var auxID
    	if (peer === null) {
		    peer = Peer({trickle: false, stream: this.state.stream})
		    peer.on('signal', (data) => {
		      //console.log('peer signal', data)
		      if(mythis.state.TypeUser == "Response") {
		      //	auxID = JSON.stringify(data)

		      	mythis.setState({myID:JSON.stringify(data)})

		      

			      	message = {
					  	"id": "reponseToken",
					  	"name": username,
					  	"iniciador": mythis.state.aux.iniciador,
					  	"userRemote": idUsu,
					  	"token": mythis.state.myID
					}
					if(mythis.state.myID != "{\"renegotiate\":true}") {
						mythis.sendMessage(message)
					}

					
					//console.log(message)
					 
			    }

		    })
		    	
		    
		}

		var data = mythis.state.aux.token
		 
		//console.log(data)
		
		peer.signal(data)
		
		//console.log("Estoy dentro de connect")
		peer.on('connect', () => {
			console.log('peer connected')
		})
		peer.on('data', (data) => {
			const message = data.toString('utf-8')
			console.log('peer received', message)
			this.setState({messages: this.state.messages.concat("\n"+this.state.aux.name+" "+message)})
		})
		peer.on('stream', (stream) => {
			console.log("Send stream")
			this.handleVideoRemote(stream)
			this.startRecording()
		})
		peer.on('error', (error) => {
			console.error('peer error', error)
		})
		peer.on('close', () => {
			console.log('peer connection closed')
			document.getElementById("gum").poster = "./../img/medicoAzul.png"; 
	    	document.getElementById("video1").poster = "./../img/medicoRojo.png"; 
	    	document.getElementById("gum").src = null;
	    	document.getElementById("video1").src = null;
	    	//this.setState({ videoSrc: null });
	    	//this.setState({ videoRemoteSrc: null });
	    	this.state.stream.getTracks().forEach( (track) => {
				track.stop();
			});
	    	peer.destroy()
	    	this.setState({ videoRemoteSrc: null});
	    	this.setState({ stream: null });
    		this.setState({ videoSrc: null});

		})

		
		
    }

    send() {

    	var username = localStorage.getItem('username');
    	var mesg = this.campoMessage.value
    	if(mesg != "") {
    		this.setState({messages: this.state.messages.concat("\n"+username+": "+mesg)})
	    	peer.send(mesg)
	    	$('#yourMessage').val('');
    	}
    	
    }

    handleVideoRemote(str) {	

    	this.setState({ videoRemoteSrc: window.URL.createObjectURL(str) });
    }


    handleVideo(str) {	
    	this.setState({ stream: str });

    	this.setState({ videoSrc: window.URL.createObjectURL(str) });
    	if(this.state.TypeUser == "Response") {
		    	this.connect()
		}
    }

    videoError() {

    }

    colgarLlamada() {
    	//this.mediaSource.endOfStream();
    	/*$('#call').removeClass('hiden')
		$('#colgar').addClass('hiden')
    	document.getElementById("gum").poster = "./../img/medicoAzul.png"; 
    	document.getElementById("video1").poster = "./../img/medicoRojo.png"; 
    	document.getElementById("gum").src = null;
    	document.getElementById("video1").src = null;
    	//this.setState({ videoSrc: null });
    	//this.setState({ videoRemoteSrc: null });
    	this.state.stream.getTracks().forEach( (track) => {
			track.stop();
		});*/
    	peer.destroy()

    	


    }





    /**GRABACION*/

    /*record() {
    	
		if (this.recordButton.textContent === 'Start Recording') {
			this.startRecording();
		} else {
			this.stopRecording();
			this.recordButton.textContent = 'Start Recording';
		}
    }*/

    startRecording() {

		this.recordedBlobs = [];
		let options = {mimeType: 'video/webm,codecs=vp9'};
		if (!MediaRecorder.isTypeSupported(options.mimeType)) {
			console.log(options.mimeType + ' is not Supported');
			options = {mimeType: 'video/h264'};
			if (!MediaRecorder.isTypeSupported(options.mimeType)) {
				console.log(options.mimeType + ' is not Supported');
				options = {mimeType: 'video/mp4'};
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					console.log(options.mimeType + ' is not Supported');
					options = {mimeType: 'video/webm'};
				}
			}
		}
		try {
			console.log(options)
			this.mediaRecorder = new MediaRecorder(this.state.stream, options);
		} catch (e) {
			console.error(e);
			alert(`Exception while creating MediaRecorder: ${e}. mimeType: ${options.mimeType}`);
			return;
		}
		console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
		this.recordButton.textContent = 'Stop Recording';
		this.mediaRecorder.onstop = this.handleStop;
		this.mediaRecorder.ondataavailable = this.handleDataAvailable;
		this.mediaRecorder.start(10); // collect 10ms of data
		console.log('MediaRecorder started', this.mediaRecorder);

    }

    stopRecording() {
    	this.mediaRecorder.stop();
 		console.log('Recorded Blobs: ', this.recordedBlobs);
  		this.recordedVideo.controls = true;

    }

    download() {
    	console.log("entro")
		const blob = new Blob(this.recordedBlobs, {type: 'video/mp4'});
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		var date = Date.now();
		a.download = 'OneHealth'+date+'.mp4';
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
		}, 100);


    }

    handleStop(event) {
    	console.log('Recorder stopped: ', event);
    	this.colgarLlamada()

    }

    handleSourceOpen(event) {
		console.log('MediaSource opened');
		this.sourceBuffer = mediaSource.addSourceBuffer('video/mp4;');
		console.log('Source buffer: ', sourceBuffer);
	}

	handleDataAvailable(event) {
	  if (event.data && event.data.size > 0) {
	    this.recordedBlobs.push(event.data);
	  }
	}

	play() {
		console.log("entro")
		const superBuffer = new Blob(this.recordedBlobs, {type: 'video/mp4'});
		this.recordedVideo.src = window.URL.createObjectURL(superBuffer);
		// workaround for non-seekable video taken from
		// https://bugs.chromium.org/p/chromium/issues/detail?id=642012#c23
		this.recordedVideo.addEventListener('loadedmetadata', () => {
		if (this.recordedVideo.duration === Infinity) {
		  this.recordedVideo.currentTime = 1e101;
		  this.recordedVideo.ontimeupdate = function() {
		    this.recordedVideo.currentTime = 0;
		    this.recordedVideo.ontimeupdate = function() {
		      delete this.recordedVideo.ontimeupdate;
		      this.recordedVideo.play();
		    };
		  };
		} else {
		  this.recordedVideo.play();
		}
		});
	}


    /**GRABACION**/

    render() {
        return <div className="body-videollamada">
        			<div className="boxVideo">
						<video id="gum" className=" video videoStream" src={this.state.videoRemoteSrc} autoPlay="true" />
						<video id="video1" className="video videoLocal" src={this.state.videoSrc} autoPlay="true" />
						<video id="recorded" className="" controls ></video>
						
					</div>
					<div className="buttons">
						<button id="call" onClick={this.initiater} className="button button-call circle-button"><FontAwesomeIcon className="iconCall" icon="phone" /></button> 
						<button id="colgar" onClick={this.stopRecording} className="button circle-button hiden hangup"><FontAwesomeIcon className="iconCall" icon="phone-slash" /></button><br></br>
					</div>

        			<div className="boxMyID hiden">
	        			<span>Mi ID: </span>
	        			<div className="containerMyID"><p id="myId"  ref={(campo)=>{this.campoMyID=campo}} className="myID">{this.state.myID}</p><div className="clear"></div></div>
					</div>
					<div className="boxYourId hiden">
						<span>Otra ID:</span>  <br></br>
						<input id="otherId" className="input" ref={(campo)=>{this.campoOtherID=campo}}></input> <br></br>
						<button id="connect" onClick={this.connect} className="button">Conectar</button>  <br></br> <br></br>
					</div>
					
					<div className="boxMessages">
						<span className="titulo-conversacion">Conversación</span> <br></br>
						<div className="conversacion">
							<pre id="messages" >{this.state.messages}</pre>
						</div>
						<div className="chat">
							<input id="yourMessage" ref={(campo)=>{this.campoMessage=campo}} className="input" placeholder="Introduce el mensaje ..."></input> 
							<button id="send" onClick={this.send} className="button send"><FontAwesomeIcon className="iconCall" icon="angle-double-right" /></button>
						</div>
						<button id="record" className="button hiden">Start Recording</button> &nbsp;
						<button id="play" onClick={this.play} className="button">Play</button> &nbsp;
						<button id="download" onClick={this.download} className="button">Download</button><br></br>
						
					</div>
					<div className="clear"></div>
					
					
				</div>
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteWebRTCSimple