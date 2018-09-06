import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ComponenteCita extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false
        };
        this.errores = this.errores.bind(this)
        this.verCita = this.verCita.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    verCita(){
        this.props.handleVer(this.props.cita.id)
    }

    render(){

        return <div className="item">
            <li onClick={this.verCita} className="list-group-item"> 
                <label className="fecha-citas">Fecha: {this.props.cita.fecha} </label>
                <label className="hora-citas">Hora: {this.props.cita.hora} </label>
                {/*<button className="borrar" ><FontAwesomeIcon icon="info-circle" /></button>&nbsp;*/}
            </li>
        </div>
        
        
    }
}

export default ComponenteCita