import React from 'react'
import ApiKurento from './servicios/api.js'
import io from 'socket.io-client';

class ComponenteComprobarCita extends React.Component {

	constructor() {
        super()
        this.comprobarCodigo = this.comprobarCodigo.bind(this);

    }


	comprobarCodigo() {






	}


    render() {
        return <div>
            <div className="comprobarCita">
            	
            	<div className="form">
					<span className="titulo-comp-cita">Número de cita </span>  <br></br><br></br><br></br>
					<input id="codcita" className="input" ref={(campo)=>{this.name=campo}} placeholder="Ingresa el código cita ..."></input> <br></br><br></br><br></br><br></br>
					<button id="comprobar" onClick={this.comprobarCodigo} className="button">Comprobar</button>  <br></br> <br></br>
				</div>
			</div>
			
        </div> 
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteComprobarCita