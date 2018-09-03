import React from 'react'

import ComprobarCita from './ComponenteComprobarCita'
import Video from './ComponenteVideo'
import Historial from './ComponenteHistorial'
import NuevaCita from './ComponenteNuevaCita'
import Mensajes from './ComponenteMensajes'
import NuevaConsulta from './ComponenteNuevaConsulta'
import ListarCitas from './ComponenteListarCitas'
import Password from './ComponenteUpdatePass'
import Usuario from './ComponenteUpdateUser'
import Admin from './ComponenteAdmin'
import io from 'socket.io-client';
import WebRTCSimple from './ComponenteWebRTCSimple'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class ComponenteInicio extends React.Component {


	constructor() {
        super()
        this.state = {
            inicio: false,
            historial: false,
            crearCitas: false,
            listarCitas: false,
            mensajes: false,
            videollamada: false,
            llamando: false,
            info: "",
            confirmacionLlamada: false,
			codigoValido: false,
			video:false,
			consulta:false,
			update:false,
			updateUser:false,
			srcVideo: null,
			mensajesVideo: null,
			idVideo: 0
        }
        this.inicio = this.inicio.bind(this);
        this.crearCitas = this.crearCitas.bind(this);
        this.listarCitas = this.listarCitas.bind(this);
		this.historial = this.historial.bind(this);
		this.historialVideo = this.historialVideo.bind(this);
        this.mensajes = this.mensajes.bind(this);
        this.vistaVideo = this.vistaVideo.bind(this);
		this.videollamada = this.videollamada.bind(this);
		this.nuevaConsulta = this.nuevaConsulta.bind(this)
		this.doLogout = this.doLogout.bind(this)
		this.actualizar = this.actualizar.bind(this)
		this.actualizarUser = this.actualizarUser.bind(this)

	}
	
	doLogout() {
		localStorage.clear()
		this.props.handleLogout()
	}

    inicio() {
    	this.setState({inicio: true})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({videollamada: false})
    	this.setState({llamando: false})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})

    }

    crearCitas() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: true})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({videollamada: false})
    	this.setState({llamando: false})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})
    }

    listarCitas() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: true})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({llamando: false})
		this.setState({videollamada: false})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})
   	}

   	historial() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: true})
    	this.setState({mensajes: false})
    	this.setState({llamando: false})
    	this.setState({videollamada: false})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})
	}
	   
	historialVideo(idVideo1) {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
		this.setState({videollamada: false})
		this.setState({idVideo: idVideo1})
		this.setState({video: true})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})
   	}

    mensajes() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: true})
    	this.setState({llamando: false})
		this.setState({videollamada: false})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})
    }

    videollamada() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({llamando: false})
		this.setState({videollamada: true})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})

	}
	
	nuevaConsulta( video1, mensajes) {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
		this.setState({videollamada: false})
		//console.log(mensajes)
		this.setState({mensajesVideo: mensajes})
		this.setState({video: false})
		this.setState({srcVideo:video1})
		this.setState({consulta: true})
		this.setState({update:false})
		this.setState({updateUser:false})
		this.setState({llamando: false})
		this.setState({videollamada: false})

	}
	
	actualizar(){
		this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
		this.setState({videollamada: false})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:true})
		this.setState({updateUser:false})
		this.setState({llamando: false})
    }

    vistaVideo(message) {
    	//console.log("Esto es el json")
    	//console.log(message)
    	this.setState({info: message})
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
		this.setState({videollamada: false})
    	this.setState({confirmacionLlamada: true})
    	this.setState({llamando: true})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:false})
	}

	actualizarUser(){
		this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
		this.setState({videollamada: false})
		this.setState({video: false})
		this.setState({consulta: false})
		this.setState({update:false})
		this.setState({updateUser:true})
		this.setState({llamando: false})
	}
    	
    	
    
    componentDidMount() {
    	var connectionOptions = {
			"force new connection": true,
			"reconnectionAttempts": "Infinity",
			"timeout": 10000,
			"transports": ["websocket"]
		}
		var mythis = this
		var idUsu = localStorage.getItem('id');

		this.socket = io.connect("https://localhost:3000", connectionOptions);
		//console.log(this.socket)
		mythis.socket.on('User'+ idUsu, function(message) {
			if(mythis.state.confirmacionLlamada == false) {
				//console.log("\n\n ESTOY EN EL MENSAJE HORRIBLE\N\N")
				//console.log('Received message: ')
				if (confirm('El usuario' + message.name
				+ ' te esta llamando. ¿Quieres aceptar la llamada?')) {
					mythis.vistaVideo(message)


				}
			}
			
		})
		
    }


    render() {
    	//console.log(this.state.videollamada)
    	var login = localStorage.getItem('username');
		var tipo = localStorage.getItem('tipo');

    	//Comprobar codigo

    	if(this.state.videollamada == true && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false && this.state.llamando == false && this.state.confirmacionLlamada==false && !this.state.video && !this.state.consulta && !this.state.update) {
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! </p> 
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span>
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                

			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>

			            {/* <Video ></Video> */}
			            <div className="clear"></div>
			            <ComprobarCita socket={this.socket} handleConsulta={this.nuevaConsulta} ></ComprobarCita>		   
		        	</div> 

		//actualizar contraseña  
    	} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false && this.state.llamando == false && !this.state.video && !this.state.consulta && this.state.update && !this.state.updateUser){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! </p> 
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span>
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li  className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            {/*<div className="banner">
		            		<img className="img-banner" src="./../img/medico2.png"></img>
						</div>*/}
						{<Password handleVolver={this.inicio}></Password>}

			        </div> 
		//actualizar datos
    	}else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false && !this.state.video && !this.state.consulta && !this.state.update && this.state.updateUser){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            {/*<div className="banner">
		            		<img className="img-banner" src="./../img/medico2.png"></img>
						</div>*/}
						{<Usuario handleVolver={this.inicio}></Usuario>}

			        </div> 
		//crear cita
    	}else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == true && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false && !this.state.video && !this.state.consulta && !this.state.update && !this.state.updateUser){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            <div className="banner">
		            		<img className="img-banner" src="./../img/doctor2.png"></img>
		            	</div>
						<NuevaCita handleVolver={this.inicio}></NuevaCita>

			   
			        </div> 
		//listarCitas
		} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == true && this.state.historial == false && this.state.mensajes == false && this.state.llamando == false && !this.state.video && !this.state.consulta && !this.state.update && !this.state.updateUser){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! </p> 
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span>
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            {/*<div className="banner">
		            		<img className="img-banner" src="./../img/medicos2.png"></img>
						</div>*/}
						{<ListarCitas></ListarCitas>}

			   
			        </div> 
		//historial
    	} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == true && this.state.mensajes == false && this.state.llamando == false && !this.state.video && !this.state.consulta && !this.state.update && !this.state.updateUser){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! </p>
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span> 
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            {/*<div className="banner">
		            		<img className="img-banner" src="./../img/medicos.png"></img>
		            	</div>*/}
						{/*<Video></Video>*/}
						{<Historial verVideo={this.historialVideo}></Historial>}
						

			   
			        </div> 
		//video
		}else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false && this.state.video && !this.state.consulta && !this.state.update && !this.state.updateUser){
			return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! </p> 
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span>
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            {/*<div className="banner">
		            		<img className="img-banner" src="./../img/medicos.png"></img>
		            	</div>*/}
						{<Video idVideo={this.state.idVideo}></Video>}
						

			   
			        </div> 
		//mensajes
    	} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == true && this.state.llamando == false && !this.state.video && !this.state.consulta && !this.state.update && !this.state.updateUser){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! </p>
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span> 
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            {/*<div className="banner">
		            		<img className="img-banner" src="./../img/medico2.png"></img>
						</div>*/}
						{<Mensajes></Mensajes>}

			        </div> 

		//Llamando
		} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false && this.state.llamando == true && !this.state.consulta) {

			return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}!</p> 
			                    <span className="icono"><FontAwesomeIcon icon="heartbeat" /></span>
			                    <button className="mi-cuenta" >Mi cuenta</button>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	<div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>
			 			<WebRTCSimple user="Response" infoAux={this.state.info} socket={this.socket} handleInicio={this.inicio} handleConsulta={this.nuevaConsulta}></WebRTCSimple>
			 		</div>
		//nueva consulta
    	} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false && !this.state.video && this.state.consulta && !this.state.update && !this.state.updateUser){
    		return <div>

	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p>
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span> 
			                    <div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li  className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li  onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
			            	{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>
			 			<NuevaConsulta sip={this.state.sip} video={this.state.srcVideo} mensajes={this.state.mensajesVideo} handleVolver={this.inicio}></NuevaConsulta>
			 		</div>

		//inicio
    	}else if(tipo=="admin"){
			return <Admin salir={this.doLogout}></Admin>

		}else {
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! </p>
								<span className="icono"><FontAwesomeIcon icon="heartbeat" /></span> 
								<div className="menu-perfil">
			                    <span className="mi-cuenta" >Perfil</span>
									<div className="clear"></div>
									<ul className="lista">
										<li onClick={this.actualizarUser} className="nav-opt">Actualizar datos</li>
										<li onClick={this.actualizar} className="nav-opt">Cambiar contraseña</li>
										<li onClick={this.doLogout} className="nav-opt">Cerrar cesión</li>
										<div className="clear"></div>
									</ul>
								</div>
							</div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<div className="menu-cita" >
								<span className="nav-opt">Citas</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.crearCitas} className="nav-opt">Nueva cita</li>
									<li onClick={this.listarCitas} className="nav-opt">Ver citas</li>
									<div className="clear"></div>
								</ul>
							</div>
							{tipo=="medico" ? <div className="menu-cita" >
								<span className="nav-opt">Historial</span>
								<div className="clear"></div>
								<ul className="lista">
									<li onClick={this.historial} className="nav-opt">Historial clínico</li>
									<li onClick={this.nuevaConsulta} className="nav-opt">Nueva consulta</li>
									<div className="clear"></div>
								</ul>
							</div>: <button className=" nav-opt" onClick={this.historial}>Historial</button>}
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            <div className="banner">
		            		<img className="img-banner" src="./../img/personas.jpg"></img>
		            	</div>

		            	<div className="body">		

		            		{/*<div className="col2">
		            		 <div class="tumblr-post" data-href="https://embed.tumblr.com/embed/post/KiBYEnmyXDZwvI54OqkLNA/156134830236" data-did="da39a3ee5e6b4b0d3255bfef95601890afd80709"><a href="https://equipo.tumblr.com/post/156134830236"></a></div> 				
			            	</div>
			            	 <div className="col2">
			            	 <div class="tumblr-post" data-href="https://embed.tumblr.com/embed/post/B4Lx_b2m0KJ3EZSaE8FhfA/141487923528" data-did="7d65340aa45472fff844822c255eb2e212a9ff04"><a href="https://vidachistosa.tumblr.com/post/141487923528/lo-divertido-de-tener-apoyo-moral"></a></div> 
			            	</div>*/}
			            	<div className="col2">
			            		<label className="titulo-inicio">España es el penúltimo país desarrollado en comunicación médico-paciente</label>

				            	A los pacientes españoles les cuesta entender las explicaciones "sencillas" de sus médicos. Y es que España es uno de los países de la Organización para la Cooperación y el Desarrollo Económicos (OCDE) donde los ciudadanos tienen mayor dificultad para entender la información acerca de sus dolencias que les transmite su facultativo, según el estudio Entregar servicios de salud de calidad: un imperativo global para la cobertura universal de salud elaborado de forma conjunta por la propia OCDE, la Organización Mundial de la Salud (OMS) y el Banco Mundial.

							</div>


				            <div className="col2">
			            		<label className="titulo-inicio">Estas son las tres especialidades médicas más 'envejecidas' en el SNS </label>
			            		En los próximos diez años se estima que se jubilen en torno a 70.000 médicos en España. Esta situación deriva en un gran número de especialidades 'envejecidas' y que necesitan de un cambio generacional, que debería de llegar a través del incremento de plazas MIR.
			            		Según el ‘Estudio sobre Demografía Médica’, elaborado por la OMC y CESM, el promedio de edad del médico activo en España en el año 2017 es de 49,2 años. Girona es la provincia con el promedio más elevado (56,8 años) mientras que, por el otro lado, se encuentra a Madrid con el promedio de edad del médico activo más bajo (46,2 años).

								En este sentido, Análisis Clínicos es la especialidad más 'envejecida' con una edad media de sus especialistas de 56,4 años. A esta le sigue Medicina del Trabajo (55,0 años)  y Medicina Legal y Forense (54,8 años). -La especialidad de Estomatología desapareció en 2001 y cuenta con una edad media de 59,7 años
							</div>

							<div className="col2">
			            		<label className="titulo-inicio">España es el penúltimo país desarrollado en comunicación médico-paciente</label>

				            	A los pacientes españoles les cuesta entender las explicaciones "sencillas" de sus médicos. Y es que España es uno de los países de la Organización para la Cooperación y el Desarrollo Económicos (OCDE) donde los ciudadanos tienen mayor dificultad para entender la información acerca de sus dolencias que les transmite su facultativo, según el estudio Entregar servicios de salud de calidad: un imperativo global para la cobertura universal de salud elaborado de forma conjunta por la propia OCDE, la Organización Mundial de la Salud (OMS) y el Banco Mundial.

								De acuerdo con este documento, el 37,9 por ciento de los pacientes españoles no entienden las explicaciones sencillas de su doctor, lo que supone que España se sitúa entre los países de la OCDE con un porcentaje más bajo en este sentido, casi 20 puntos por debajo de la media de la OCDE, fijada en un 18,7 por ciento, y a una distancia bastante pronunciada de países de nuestro entorno como Bélgica (4,9 por ciento), Portugal (9,1 por ciento) o Reino Unido (12 por ciento).
							</div>
				            <div className="col2">
			            		<label className="titulo-inicio">Estas son las tres especialidades médicas más 'envejecidas' en el SNS </label>
			            		En los próximos diez años se estima que se jubilen en torno a 70.000 médicos en España. Esta situación deriva en un gran número de especialidades 'envejecidas' y que necesitan de un cambio generacional, que debería de llegar a través del incremento de plazas MIR.
			            		Según el ‘Estudio sobre Demografía Médica’, elaborado por la OMC y CESM, el promedio de edad del médico activo en España en el año 2017 es de 49,2 años. Girona es la provincia con el promedio más elevado (56,8 años) mientras que, por el otro lado, se encuentra a Madrid con el promedio de edad del médico activo más bajo (46,2 años).

								En este sentido, Análisis Clínicos es la especialidad más 'envejecida' con una edad media de sus especialistas de 56,4 años. A esta le sigue Medicina del Trabajo (55,0 años)  y Medicina Legal y Forense (54,8 años). -La especialidad de Estomatología desapareció en 2001 y cuenta con una edad media de 59,7 años
							</div>
						</div>

			   
			        </div> 

    	}
        
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteInicio