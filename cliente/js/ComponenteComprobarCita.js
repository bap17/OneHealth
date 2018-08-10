import React from 'react'
import Api from './servicios/api'
import Kurento from './ComponenteKurento'

class ComponenteComprobarCita extends React.Component {

	constructor(props) {
        super(props)
        this.state = {
        	codigoValido: this.props.codigoValido

        }
        this.codigo = this.codigo.bind(this);
        this.comprobarCodigo = this.comprobarCodigo.bind(this);

    }

    codigo() {
    	this.props.handleCodigo();
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
				console.log("llego")
				datos.json().then(function(valor){
					console.log(valor.respuesta)
					mythis.codigo()
				})
				
			}
		})
	}


    render() {
    	if(this.state.codigoValido == false) {
	        return <div>
	            <div className="comprobarCita">
	            	
	            	<div className="form">
						<span className="titulo-comp-cita">Número de cita </span>  <br></br><br></br><br></br>
						<input id="codcita" className="input" ref={(campo)=>{this.codigo=campo}} placeholder="Ingresa el código cita ..."></input> <br></br><br></br><br></br><br></br>
						<button id="comprobar" onClick={this.comprobarCodigo} className="button">Comprobar</button>  <br></br> <br></br>
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
export default ComponenteComprobarCita