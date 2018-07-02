import React from 'react'
import {saludar} from './modulo'

class ComponenteSaludo extends React.Component {
    render() {
        return <div>
            {saludar(this.props.nombre)}
        </div> 
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteSaludo