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
            aux: this.props.infoAux
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.initiater = this.initiater.bind(this);
        this.connect = this.connect.bind(this);
        this.send = this.send.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
        this.videoError = this.videoError.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.record = this.record.bind(this);
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
		      if(mythis.state.TypeUser == "Response") {
		      	auxID = JSON.stringify(data)

		      	mythis.setState({myID:JSON.stringify(data)})

		      

			      	message = {
					  	"id": "reponseToken",
					  	"name": username,
					  	"iniciador": mythis.state.aux.iniciador,
					  	"userRemote": idUsu,
					  	"token": mythis.state.myID
					}

					mythis.sendMessage(message)
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
    	if(this.state.TypeUser == "Response") {
		    	this.connect()
		}
    }

    videoError() {

    }






    /**GRABACION*/

    record() {
    	
		if (this.recordButton.textContent === 'Start Recording') {
			this.startRecording();
		} else {
			this.stopRecording();
			this.recordButton.textContent = 'Start Recording';
			this.playButton.disabled = false;
			this.downloadButton.disabled = false;
		}
    }

    startRecording() {

		this.recordedBlobs = [];
		let options = {mimeType: 'video/webm,codecs=vp9'};
		if (!MediaRecorder.isTypeSupported(options.mimeType)) {
			console.log(options.mimeType + ' is not Supported');
			options = {mimeType: 'video/webm'};
			if (!MediaRecorder.isTypeSupported(options.mimeType)) {
				console.log(options.mimeType + ' is not Supported');
				options = {mimeType: 'video/webm'};
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					console.log(options.mimeType + ' is not Supported');
					options = {mimeType: ''};
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
		this.playButton.disabled = true;
		this.downloadButton.disabled = true;
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
		const blob = new Blob(this.recordedBlobs, {type: 'video/webm'});
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.download = 'test.webm';
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
		}, 100);


    }

    handleStop(event) {
    	console.log('Recorder stopped: ', event);

    }

    handleSourceOpen(event) {
		console.log('MediaSource opened');
		this.sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
		console.log('Source buffer: ', sourceBuffer);
	}

	handleDataAvailable(event) {
	  if (event.data && event.data.size > 0) {
	    this.recordedBlobs.push(event.data);
	  }
	}

	play() {
		const superBuffer = new Blob(this.recordedBlobs, {type: 'video/webm'});
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
						<video id="gum"src={this.state.videoRemoteSrc} autoPlay="true" />
						<video id="recorded" controls ></video>
					</div>
					<div className="boxMessages">
						<span> Mensajes: </span> <br></br>
						<pre id="messages" >{this.state.messages}</pre>
						<input id="yourMessage" ref={(campo)=>{this.campoMessage=campo}} className="input" ></input> <br></br>
						<button id="send" onClick={this.send} className="button">Enviar</button> &nbsp;
						<button id="record" onClick={this.record} className="button">Start Recording</button> &nbsp;
						<button id="play" onClick={this.play} className="button">Play</button> &nbsp;
						<button id="download" onClick={this.download} className="button">Download</button><br></br>
					</div>
					
					
				</div>
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteWebRTCSimple