import React from 'react'

class ComponenteInitVideo extends React.Component {



    render() {
    	

    	
    		return <div>
    				<div className="clear"></div>
    				<div className="banner">
    					<img className="img-banner" src="../img/organization.png"></img>
    				</div>

    				<div className="form">
	    				<div className="filtros">
	    					<label>Especialidad</label>
	    					<select className="form-control select ">
							  <option>Familia</option>
							  <option>Pediatra</option>
							  <option>Geriatria</option>
							  <option>Ofttalmología</option>
							</select>
	    				</div>

	    				<div className="clear"></div>

	    				<div className="medicos">
	    					<label className="titulo-medico">Listado de Médicos</label>

	    					<ul className="lista-medicos" >
	    						<li>Médico 1</li>
	    						<li>Médico 2</li>
	    						<li>Médico 3</li>
	    						<li>Médico 4</li>
	    						<li>Médico 5</li>
	    					</ul>

	    				</div>
	    			</div>
		   
		        </div> 

    	}
        
    
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteInitVideo