import React, { Component } from 'react'
import API from './servicios/api'
import Consulta from './ComponenteConsulta'

class ComponenteListarConsulta extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false
        };
        this.errores = this.errores.bind(this)
        this.verConsulta = this.verConsulta.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    verConsulta(consul){
        this.props.handleDetalle(consul)
    }

    render(){
        var consultas = []

        for(var i=0; i<this.props.consultas.length;i++) {
            var elemento
            elemento = <Consulta handleVer= {this.verConsulta} consulta={this.props.consultas[i]} key={i}/>
            consultas.push(elemento)
        }
        return <div className="card">
            <div className="card-header">Consultas</div>
            <div className="card-body">
            <ul className="list-group"> {consultas} </ul>
            </div>
        </div>
    }
}

export default ComponenteListarConsulta