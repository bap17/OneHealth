import React from 'react'

import Video from './ComponenteInitVideo'
import Kurento from './ComponenteKurento'


class ComponenteInicio extends React.Component {


	constructor() {
        super()
        this.state = {
            videollamada: false
        }

        this.videollamada = this.videollamada.bind(this);
    }

    videollamada() {
    	this.setState({videollamada: true})

    }



    render() {
    	console.log(this.state.videollamada)
    	var login = localStorage.getItem('username');

    	if(this.state.videollamada == true) {
    		return <div>
        			<div className="header">
		                <img className="logo" src="../img/logo.png"></img>
		                <div className="options-top">
		                    <p className="welcome">¡Hola @{login}! :D </p> 
		                    <button className="mi-cuenta" >Mi cuenta</button>
		                </div>
		                

		            </div>
		            <div className="top-nav">
		            	<button className=" nav-opt">Inicio</button>
		            	<button className=" nav-opt">Citas</button>
		            	<button className=" nav-opt">Historial</button>
		            	<button className=" nav-opt">Mensajes</button>
		            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
		            </div>

		            {/* <Video ></Video> */}
		            <Kurento></Kurento>		   
		        </div> 

    	} else {
    		return <div>
        			<div className="header">
		                <img className="logo" src="../img/logo.png"></img>
		                <div className="options-top">
		                    <p className="welcome">¡Hola @{login}! :D </p> 
		                    <button className="mi-cuenta" >Mi cuenta</button>
		                </div>
		                
		            </div>
		            <div className="top-nav">
		            	<button className=" nav-opt">Inicio</button>
		            	<button className=" nav-opt">Citas</button>
		            	<button className=" nav-opt">Historial</button>
		            	<button className=" nav-opt">Mensajes</button>
		            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
		            </div>

		   
		        </div> 

    	}
        
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteInicio