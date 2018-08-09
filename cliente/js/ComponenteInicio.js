import React from 'react'

import Video from './ComponenteInitVideo'

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

    	if(this.state.videollamada == true) {
    		return <div>
        			<div className="header">
		                <img className="logo" src="../img/logo.png"></img>
		                <div className="options-top">
		                    <p className="welcome">¡Hola user! :D </p> 
		                </div>

		            </div>
		            <div className="top-nav">
		            	<button className=" nav-opt" >Inicio</button>
		            	<button className=" nav-opt">Cita</button>
		            	<button className=" nav-opt">Mensajes</button>
		            	<button className=" nav-opt">Eventos</button>
		            	<button className=" nav-opt">Videollamada</button>		            
		            </div>

		            <Video ></Video>
		   
		        </div> 

    	} else {
    		return <div>
        			<div className="header">
		                <img className="logo" src="../img/logo.png"></img>
		                <div className="options-top">
		                    <p className="welcome">¡Hola user! :D 
		                        <button className="btn btn-default btn-lg cerrar-sesion" ><span className="glyphicon glyphicon-cog"></span></button>
		                        <button className="btn btn-default btn-lg cerrar-sesion" ><span className="glyphicon glyphicon-log-out"></span></button> </p> 
		                </div>

		            </div>
		            <div className="top-nav">
		            	<button className=" nav-opt" >Inicio</button>
		            	<button className=" nav-opt">Cita</button>
		            	<button className=" nav-opt">Mensajes</button>
		            	<button className=" nav-opt">Eventos</button>
		            	<button className=" nav-opt" onClick={this.videollamada}>Videollamada</button>		            
		            </div>
		   
		        </div> 

    	}
        
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteInicio