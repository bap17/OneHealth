import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteMedico extends Component {
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

        return <option value={this.props.medico.id}>{this.props.medico.nombre} {this.props.medico.apellidos}</option> 
        
        
        
    }
}

export default ComponenteMedico