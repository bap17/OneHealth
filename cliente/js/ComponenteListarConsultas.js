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
    }

    errores(){
        this.setState({error:true})
    }

    render(){
        var consultas = []

        for(var i=0; i<this.props.consultas.length;i++) {
            var elemento
            elemento = <Consulta consulta={this.props.consultas[i]}/>
            consultas.push(elemento)
        }
        return <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Consultas</h3>
        </div>
        <div className="panel-body">
        <ul className="list-group"> {consultas} </ul>
        </div>
      </div>
    }
}

export default ComponenteListarConsulta