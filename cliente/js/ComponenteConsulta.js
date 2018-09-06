import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteConsulta extends Component {
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

    verConsulta(){
        this.props.handleVer(this.props.consulta)
    }

    render(){

        return <div className="item">
            <li className="list-group-item">Consulta: {this.props.consulta.fecha}
            <button type="button" className="button" onClick={this.verConsulta} >Ver</button> </li> 
        </div>
        
        
    }
}

export default ComponenteConsulta