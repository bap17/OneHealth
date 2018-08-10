import React from 'react'

import Video from './ComponenteInitVideo'
import ComprobarCita from './ComponenteComprobarCita'


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
            codigoValido: false
        }
        this.inicio = this.inicio.bind(this);
        this.crearCitas = this.crearCitas.bind(this);
        this.listarCitas = this.listarCitas.bind(this);
        this.historial = this.historial.bind(this);
        this.mensajes = this.mensajes.bind(this);
        this.videollamada = this.videollamada.bind(this);
        this.codigoY = this.codigoY.bind(this);
        this.codigoN = this.codigoN.bind(this);
    }

    inicio() {
    	this.setState({inicio: true})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({videollamada: false})
    }

    crearCitas() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: true})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({videollamada: false})
    }

    listarCitas() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: true})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({videollamada: false})
   	}

   	historial() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: true})
    	this.setState({mensajes: false})
    	this.setState({videollamada: false})
   	}

    mensajes() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: true})
    	this.setState({videollamada: false})
    }

    videollamada() {
    	this.setState({inicio: false})
    	this.setState({crearCitas: false})
    	this.setState({listarCitas: false})
    	this.setState({historial: false})
    	this.setState({mensajes: false})
    	this.setState({videollamada: true})

    }

    codigoY() {
    	console.log("estoy cambiando el codigo")
    	this.setState({codigoValido: true})
    }

    codigoN() {
    	console.log("estoy cambiando el codigo")
    	this.setState({codigoValido: false})
    }






    render() {
    	console.log(this.state.videollamada)
    	var login = localStorage.getItem('username');

    	//Comprobar codigo
    	if(this.state.videollamada == true && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false) {
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <button className="mi-cuenta" >Mi cuenta</button>
			                </div>
			                

			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<button className=" nav-opt" onClick={this.crearCitas}>Citas</button>
			            	<button className=" nav-opt" onClick={this.historial}>Historial</button>
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>

			            {/* <Video ></Video> */}
			            <div className="clear"></div>
			            <ComprobarCita handleCodigo={this.codigoY}></ComprobarCita>		   
		        	</div> 

		//crearCitas  
    	} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == true && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == false){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <button className="mi-cuenta" >Mi cuenta</button>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<button className=" nav-opt" onClick={this.crearCitas}>Citas</button>
			            	<button className=" nav-opt" onClick={this.historial}>Historial</button>
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            <div className="banner">
		            		<img className="img-banner" src="./../img/equipo.jpeg"></img>
		            	</div>

			   
			        </div> 
		//listarCitas
		} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == true && this.state.historial == false && this.state.mensajes == false){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <button className="mi-cuenta" >Mi cuenta</button>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<button className=" nav-opt" onClick={this.crearCitas}>Citas</button>
			            	<button className=" nav-opt" onClick={this.historial}>Historial</button>
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            <div className="banner">
		            		<img className="img-banner" src="./../img/equipo.jpeg"></img>
		            	</div>

			   
			        </div> 
		//historial
    	} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == true && this.state.mensajes == false){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <button className="mi-cuenta" >Mi cuenta</button>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<button className=" nav-opt" onClick={this.crearCitas}>Citas</button>
			            	<button className=" nav-opt" onClick={this.historial}>Historial</button>
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            <div className="banner">
		            		<img className="img-banner" src="./../img/doctor.png"></img>
		            	</div>

			   
			        </div> 


		//mensajes
    	} else if(this.state.videollamada == false && this.state.inicio == false && this.state.crearCitas == false && this.state.listarCitas == false && this.state.historial == false && this.state.mensajes == true){
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <button className="mi-cuenta" >Mi cuenta</button>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<button className=" nav-opt" onClick={this.crearCitas}>Citas</button>
			            	<button className=" nav-opt" onClick={this.historial}>Historial</button>
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            <div className="banner">
		            		<img className="img-banner" src="./../img/doctor.png"></img>
		            	</div>

			   
			        </div> 
		//inicio
    	} else {
    		return <div>
	        			<div className="header">
			                <img className="logo" src="../img/logo.png" onClick={this.inicio}></img>
			                <div className="options-top">
			                    <p className="welcome">¡Hola @{login}! :D </p> 
			                    <button className="mi-cuenta" >Mi cuenta</button>
			                </div>
			                
			            </div>
			            <div className="top-nav">
			            	<button className=" nav-opt" onClick={this.inicio}>Inicio</button>
			            	<button className=" nav-opt" onClick={this.crearCitas}>Citas</button>
			            	<button className=" nav-opt" onClick={this.historial}>Historial</button>
			            	<button className=" nav-opt" onClick={this.mensajes}>Mensajes</button>
			            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
			            </div>
			            <div className="clear"></div>

			            <div className="banner">
		            		<img className="img-banner" src="./../img/organization.png"></img>
		            	</div>

			   
			        </div> 

    	}
        
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteInicio