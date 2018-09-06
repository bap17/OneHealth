import React from 'react'
import Api from './servicios/api'
import CitaVideo from './ComponenteCitaVideollamada'
import Paciente from './ComponentePaciente'
import WebRTCSimple from './ComponenteWebRTCSimple'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class ComponenteComprobarCita extends React.Component {

	constructor(props) {
        super(props)
        this.state = {
        	codigoValido: false,
        	idCita: 0,
        	paciente:[],
        	search:false,
        	error: false,
        	llamada: false,
        	idPaciente: 0,
        	socket:this.props.socket

        }
        this.codigo = this.codigo.bind(this);
        this.comprobarCodigo = this.comprobarCodigo.bind(this);
        this.buscar = this.buscar.bind(this);
        this.listadoPaciente = this.listadoPaciente.bind(this);
        this.llamar = this.llamar.bind(this);
        this.consulta = this.consulta.bind(this);
    }

    

	componentDidMount() {


 		this.listadoPaciente();

    }

    codigo() {
    	//this.props.handleCodigo();
    	this.setState({codigoValido: true})
    }


	comprobarCodigo() {
		var codigo = this.codigo.value
		var idUsu = localStorage.getItem('id');
		var mythis = this

		var token = localStorage.getItem('token');
		var auxStatus
		var auxRespuesta
		new Api().comprobarCodigo(codigo, idUsu ,token).then(function(datos){

			if(datos.status!=200) {
				auxStatus=datos.status.toString()
				mythis.setState({error: true})
			} else {
				datos.json().then(function(valor){
					
					mythis.setState({idCita: valor.id})
					mythis.setState({codigoValido: true})				
				})

				
			}
		}).then(function(){
            if(auxStatus=="400"){
              document.getElementById("error").innerHTML="Faltan datos por introducir"
            } else if(auxStatus == "500") {
            	document.getElementById("error").innerHTML="Lo sentimos, hay errores por resolver"
            } else if(auxStatus == "202") {
            	document.getElementById("error").innerHTML="La cita no esta disponible"
            } else if(auxStatus == "404") {
            	document.getElementById("error").innerHTML="El código introducido no existe"
            }
          })
    }
	

	buscar() {

		var idUsu = localStorage.getItem('id');
		var token = localStorage.getItem('token');
		var sip = this.sip.value
		var mythis = this
		new Api().buscarSip(idUsu, sip, token).then(function(datos){

			if(datos.status!=200) {
				datos.json().then(function(valor){
					//console.log(valor.respuesta)
				})				
			} else {
				datos.json().then(function(valor){
					mythis.setState({paciente: valor.pacientes});	

				})				
			}
		})

	}

	llamar(id, sip1) {
		this.setState({llamada: true})
		this.setState({idPaciente: id})
		this.setState({sip: sip1})
	}

	listadoPaciente () {
		var idUsu = localStorage.getItem('id');
		var token = localStorage.getItem('token');
		var mythis = this
		new Api().litadoPacientes(idUsu, token).then(function(datos){

			if(datos.status!=200) {
				datos.json().then(function(valor){
					//console.log(valor.respuesta)
				})
				
			} else {
				datos.json().then(function(valor){
					//console.log(valor.pacientes)
					mythis.setState({paciente: valor.pacientes});	

				})

				
			}
		})
	}

	consulta(video1, mensajes) {
		//console.log(this.state.mensajes)
		this.props.handleConsulta( video1, mensajes);
	}


    render() {

    	var prods = []
		for (var i=0; i<this.state.paciente.length; i++) {
			var actual = this.state.paciente[i]
			var elemento
			elemento = <Paciente key={i}
				pos={i}
				id={actual.id}
				nombre={actual.nombre}
				apellidos={actual.apellidos}
				sip={actual.sip}
				handlellamar={this.llamar}/>
			prods.push(elemento)

		}



	


    	var tipoUsu = localStorage.getItem('tipo');
    	if(this.state.codigoValido == false && tipoUsu == 'paciente' && this.state.llamada == false) {
	        return <div>
			            <div className="comprobarCita">
			            	
			            	<div className="form">
								<span className="titulo-comp-cita">Número de cita </span>  <br></br>
								{this.state.error ?

									<p id="error" className="error"></p>: 
									<p className="error"></p>
								}
								
								<br></br>
								<input id="codcita" className="input" ref={(campo)=>{this.codigo=campo}} placeholder="Ingresa el código cita ..."></input> <br></br><br></br><br></br><br></br>
								<button id="comprobar" onClick={this.comprobarCodigo} className="button">Comprobar</button>  <br></br> <br></br>
							</div>
						</div>
						
			        </div> 
	    } else if(this.state.codigoValido == true && tipoUsu == 'paciente' && this.state.llamada == false){
	    	return <CitaVideo idCita={this.state.idCita} socket={this.state.socket}></CitaVideo>
	    } else if(tipoUsu == 'medico' && this.state.llamada == false) {
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
		    					<button id="buscar" onClick={this.buscar} className="button">Buscar</button> <button className="reload" onClick={this.listadoPaciente} > <FontAwesomeIcon icon="sync-alt" /></button> <br></br> <br></br>
		    					
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


	    } else if(tipoUsu == 'medico' && this.state.llamada == true) {
	    	return <WebRTCSimple  idPaciente={this.state.idPaciente} socket={this.state.socket}  handleConsulta={this.consulta}></WebRTCSimple>
	    }
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteComprobarCita