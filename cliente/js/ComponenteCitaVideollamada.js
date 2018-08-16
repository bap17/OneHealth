import React from 'react'
import Api from './servicios/api'
import Kurento from './ComponenteKurento'


class ComponenteCitaVideollamada extends React.Component {

	constructor(props) {
        super(props)
        this.state = {
        	id: this.props.idCita,
        	nombrePac: null,
        	apellidosPac: null,
        	emailPac: null,
        	fecha: null,
        	hora: null,
        	nombreMed:null,
        	apellidosMed: null,
        	especialidad: null,
        	kurento: false
        }
        this.getCita = this.getCita.bind(this);
        this.kurentoState = this.kurentoState.bind(this);
        this.cancelarCita = this.cancelarCita.bind(this);

    }

    componentWillMount() {
    	this.getCita()

    }

    getCita() {
    	var mythis = this;
    	var idUsu = localStorage.getItem('id');
		var token = localStorage.getItem('token');
    	console.log("id cita: ")
    	console.log(this.props.idCita)
    	console.log(this.state.id)
    	new Api().getCita(idUsu, this.state.id, token).then(function(datos){
			if(datos.status!=200) {
				datos.json().then(function(valor){
					console.log(valor)
				})
				
			} else {
				console.log("estoy dentro de cita")
				datos.json().then(function(valor){
					console.log(valor)
					mythis.setState({nombrePac: valor.nombrePac})
					mythis.setState({apellidosPac: valor.apellidosPac})
					mythis.setState({emailPac: valor.emailPac})
					mythis.setState({fecha: valor.fecha})
					mythis.setState({hora: valor.hora})
					mythis.setState({nombreMed: valor.nombreMed})
					mythis.setState({apellidosMed: valor.apellidosMed})
					mythis.setState({especialidad: valor.especialidad})
				})

				
			}
		})

    }

    kurentoState() {
    	this.setState({kurento: true})
    }

    cancelarCita() {
    	var cita = this.state.id
    	var idUsu = localStorage.getItem('id');
		var token = localStorage.getItem('token');
    	new Api().cancelarCita(idUsu, cita, token).then(function(datos){
			if(datos.status!=200) {
				datos.json().then(function(valor){
					console.log(valor)
				})
				
			} else {
				datos.json().then(function(valor){
					console.log(valor)
					
				})
			}
		})
    }



    render() {

    	if(this.state.kurento == false) {
	    	return <div className = "body-cita-videollamada">
		    				<label className="titulo-comp-cita"> Cita Videollamada </label>
		    				<div className="clear"></div>
		    				<div className="content">
			    				<div className="col2">

			    					<label className="titulo-mediano">Paciente</label>
			    					<div className="parrafo">
			    						<label className="label">Nombre:</label> <label>{this.state.nombrePac}</label><br></br>
			    						<label className="label">Apellidos:</label> <label>{this.state.apellidosPac}</label><br></br>
			    						<label className="label">Email:</label> <label>{this.state.emailPac}</label><br></br>
			    					</div>
			    					<label className="titulo-mediano">Cita</label>
			    					<div className="parrafo">
			    						<label className="label">Fecha:</label> <label>{this.state.fecha}</label><br></br>
			    						<label className="label">Hora:</label> <label>{this.state.hora}</label><br></br>
			    					</div>
			    				</div>
			    				<div className="col2">
			    					<label className="titulo-mediano">Médico</label>
			    					<div className="parrafo">
			    						<label className="label">Nombre:</label> <label>{this.state.nombreMed}</label><br></br>
			    						<label className="label">Apellidos:</label> <label>{this.state.apellidosMed}</label><br></br>
			    						<label className="label">Especialidad:</label> <label>{this.state.especialidad}</label><br></br>
			    					</div>
			    					<div className="parrafo button-cita-video">
			    						<button className="button button-call" onClick={this.kurentoState}>Videollamada</button> <br></br> <br></br> 
			    						<button className="button" onClick={this.cancelarCita}>Cancelar Cita</button>
			    					</div>
			    				</div>

		    				</div>
		    				
		    			</div>
		 } else {
		 	return <Kurento></Kurento>
		 }
	}
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteCitaVideollamada