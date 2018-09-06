import React, { Component } from 'react'
import API from './servicios/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ComponenteMensaje extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false
        };
        this.errores = this.errores.bind(this)
        this.verMensaje = this.verMensaje.bind(this)
        this.borrarMensaje = this.borrarMensaje.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    verMensaje(){
        this.props.handleDetalle(this.props.mensaje)
    }

    borrarMensaje(){
        this.props.handleBorrar(this.props.mensaje.id)
    }

    render(){

        return <div className="item">
            <li  className="list-group-item"> 
            <label className="mensaje-usu">{this.props.mensaje.usuario} </label>
            <label className="mensaje-asunto"> {this.props.mensaje.asunto}</label>
            <button className="borrar" onClick={this.verMensaje}><FontAwesomeIcon icon="info-circle" /></button>&nbsp;
            {this.props.mensaje.tipo == "enviado" ? <button onClick={this.borrarMensaje} className="borrar"><FontAwesomeIcon icon="trash-alt" /></button>: <p></p> }</li>
        </div>
        
        
    }
}

export default ComponenteMensaje