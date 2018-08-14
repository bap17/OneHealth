import React from 'react'
import Api from './servicios/api'
import Kurento from './ComponenteKurento'
import CitaVideo from './ComponenteCitaVideollamada'
class ComponenteComprobarCita extends React.Component {

	constructor() {
        super()
        this.state = {
        	codigoValido: false,
        	idCita: 0

        }
        this.codigo = this.codigo.bind(this);
        this.comprobarCodigo = this.comprobarCodigo.bind(this);

    }

    codigo() {
    	//this.props.handleCodigo();
    	this.setState({codigoValido: true})
    }


	comprobarCodigo() {

		console.log("estoy in")
		var codigo = this.codigo.value
		var idUsu = localStorage.getItem('id');
		var mythis = this

		new Api().comprobarCodigo(codigo, idUsu).then(function(datos){

			if(datos.status!=200) {
				datos.json().then(function(valor){
					console.log(valor.respuesta)
				})
				
			} else {
				datos.json().then(function(valor){
					
					mythis.setState({idCita: valor.id})
					mythis.setState({codigoValido: true})				
				})

				
			}
		})
	}


    render() {
    	var tipoUsu = localStorage.getItem('tipo');
    	if(this.state.codigoValido == false && tipoUsu == 'paciente') {
	        return <div>
	            <div className="comprobarCita">
	            	
	            	<div className="form">
						<span className="titulo-comp-cita">Número de cita </span>  <br></br><br></br><br></br>
						<input id="codcita" className="input" ref={(campo)=>{this.codigo=campo}} placeholder="Ingresa el código cita ..."></input> <br></br><br></br><br></br><br></br>
						<button id="comprobar" onClick={this.comprobarCodigo} className="button">Comprobar</button>  <br></br> <br></br>
					</div>
				</div>
				
	        </div> 
	    } else if(this.state.codigoValido == true && tipoUsu == 'paciente'){
	    	return <CitaVideo idCita={this.state.idCita}></CitaVideo>
	    } else if(tipoUsu == 'medico') {
	    	return <div>
    				<div className="clear"></div>
    				<div className="banner">
    					<img className="img-banner" src="../img/worldhealth.png"></img>
    				</div>

    				<div className="form">
	    				<div className="filtros">
	    					<label>Especialidad</label>
	    					<select className="form-control select ">
							  <option>Familia</option>
							  <option>Pediatra</option>
							  <option>Geriatria</option>
							  <option>Ofttalmología</option>
							</select>
	    				</div>

	    				<div className="clear"></div>

	    				<div className="medicos">
	    					<label className="titulo-medico">Listado de Médicos</label>

	    					<ul className="lista-medicos" >
	    						<li>Médico 1</li>
	    						<li>Médico 2</li>
	    						<li>Médico 3</li>
	    						<li>Médico 4</li>
	    						<li>Médico 5</li>
	    					</ul>

	    				</div>
	    			</div>
		   
		        </div> 


	    }
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteComprobarCita