import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteConsulta extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false
        };
        this.errores = this.errores.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    render(){
        return <div className="item">
            <span> <li className="list-group-item">Fecha: {this.props.consulta.fecha}</li> </span>
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default" >Detalles</button>
            </div>
        </div>
    }
}

export default ComponenteConsulta