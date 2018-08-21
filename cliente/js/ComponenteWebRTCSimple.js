import React from 'react'
import Api from './servicios/api.js'
import Peer from 'simple-peer'
import $ from 'jquery'
import css from '../css/mystyle.css';

var peer = null
var initiator = null
var connect = null
var signal_input = null

class ComponenteWebRTCSimple extends React.Component {


	constructor() {
        super()
        this.state = {
            myID:"",
            messages: "",
            stream: null,
            videoSrc:null,
            videoStream:null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.initiater = this.initiater.bind(this);
        this.connect = this.connect.bind(this);
        this.send = this.send.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
        this.videoError = this.videoError.bind(this);
    }

    componentDidMount() {
    	var mythis = this
    	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
	    if (navigator.getUserMedia) {
	        navigator.getUserMedia({video: true},this.handleVideo, this.videoError);
	    }
    }

    initiater() {
    	peer = Peer({trickle: false, initiator: true, stream: this.state.stream})

		peer.on('signal', (data) => {
		  console.log('peer signal', data)
		  this.setState({myID:JSON.stringify(data)})
		})
    }

    connect() {
    	if (peer === null) {
		    peer = Peer({trickle: false, stream: this.state.stream})
		    peer.on('signal', (data) => {
		      console.log('peer signal', data)
		      this.setState({myID:JSON.stringify(data)})
		    })
		}
		var data = this.campoOtherID.value
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
			handleVideo(stream)
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
						<button id="getID" onClick={this.initiater} className="button">Obtener my ID</button> <br></br>  <br></br>
					</div>
					<div className="boxYourId">
						<span>Otra ID:</span>  <br></br>
						<input id="otherId" className="input" ref={(campo)=>{this.campoOtherID=campo}}></input> <br></br>
						<button id="connect" onClick={this.connect} className="button">Conectar</button>  <br></br> <br></br>
					</div>
					<div className="boxVideo">
						<video src={this.state.videoSrc} autoPlay="true" />
						<video src={this.state.videoStream} autoPlay="true" />
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