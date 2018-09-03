import React, { Component } from 'react'

class ComponenteEspecialidad extends Component {
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

        return <option value={this.props.espe.nombre}>{this.props.espe.nombre}</option> 
        
        
        
    }
}

export default ComponenteEspecialidad