import React from 'react'
import Api from './servicios/api'
import Kurento from './ComponenteKurento'
import CitaVideo from './ComponenteCitaVideollamada'
import Paciente from './ComponentePaciente'
class ComponenteComprobarCita extends React.Component {

	constructor() {
        super()
        this.state = {
        	codigoValido: false,
        	idCita: 0,
        	paciente:[]

        }
        this.codigo = this.codigo.bind(this);
        this.comprobarCodigo = this.comprobarCodigo.bind(this);
        this.buscar = this.buscar.bind(this);
        this.listadoPaciente = this.listadoPaciente.bind(this);
        this.llamar = this.llamar.bind(this);
    }

    

	componentDidMount() {

 		this.listadoPaciente();

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

	buscar() {

	}

	llamar() {
		console.log("estoy en llamar")
	}

	listadoPaciente () {
		var idUsu = localStorage.getItem('id');
		var mythis = this
		new Api().litadoPacientes(idUsu).then(function(datos){

			if(datos.status!=200) {
				datos.json().then(function(valor){
					console.log(valor.respuesta)
				})
				
			} else {
				datos.json().then(function(valor){
					console.log(valor.pacientes)
					mythis.setState({paciente: valor.pacientes});	

				})

				
			}
		})
	}


    render() {

    	var prods = []
		for (var i=0; i<this.state.paciente.length; i++) {
			var actual = this.state.paciente[i]
			console.log(actual.nombre)
			var elemento
			elemento = <Paciente key={i}
				pos={i}
				nombre={actual.nombre}
				apellidos={actual.apellidos}
				sip={actual.sip}
				handlellamar={this.llamar}/>
			prods.push(elemento)

		}



	


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
    				<div className = "body-cita-videollamada">
    				<label className="titulo-comp-cita">Videollamada </label>
	    				<div className="form">	    					
		    				<div className="filtros">
		    					<label>Buscar por SIP: </label>
		    					<input id="sip" className="input input-pequeño input-buscarsip" ref={(campo)=>{this.sip=campo}} placeholder="Ingresa la sip del paciente"></input> 
		    					<button id="buscar" onClick={this.buscar} className="button">Buscar</button>  <br></br> <br></br>
		    					
		    				</div>

		    				<div className="clear"></div>

		    				<div className="pacientes">
		    					<label className="titulo-paciente">Listado de Pacientes</label>

		    					<ul className="lista-pacientes" >
		    						{prods}
		    					</ul>

		    				</div>
		    			</div>
	    			</div>
		   
		        </div> 


	    }
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteComprobarCita