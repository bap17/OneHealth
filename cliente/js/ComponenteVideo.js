import React from 'react'
import Api from './servicios/api'
import Kurento from './ComponenteKurento'

class ComponenteVideo extends React.Component {

	constructor() {
        super()

    }


    render() {
    	return <div className="body">
	    			<label className="titulo-comp-cita">Video consulta </label>
		    		<div className="content-video">
		    			<video controls>
						  <source src="./../videos/OneHealth_Grande.mp4" type="video/mp4"></source>
						</video>

		    		</div>

    			</div>


	}
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteVideo