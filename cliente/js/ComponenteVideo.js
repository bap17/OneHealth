import React from 'react'
import Api from './servicios/api'

class ComponenteVideo extends React.Component {

	constructor(props) {
        super(props)
        this.state = {
        	idVideo: this.props.idVideo,
        	nombreVideo: null,
        	conversacion: null,
        	error: false
        }

        this.verVideo = this.verVideo.bind(this);

    }

    componentWillMount() {
    	this.verVideo()

    }



    verVideo() {
    	var mythis = this;
    	var idUsu = localStorage.getItem('id');
		var token = localStorage.getItem('token');
    	new Api().verVideo(idUsu, this.state.idVideo, token).then(function(datos){
			if(datos.status!=200) {
				datos.json().then(function(valor){
					console.log(valor)
				})
				
			} else {
				datos.json().then(function(valor){
					mythis.setState({nombreVideo: valor.nombreVideo})
					mythis.setState({conversacion: valor.conversacion})
					
				})

				
			}
		}).then(function(){
            if(auxStatus=="400"){
            	this.setState({error:true})
              //document.getElementById("error").innerHTML="Faltan datos por introducir"
            } else if(auxStatus == "500") {
            	this.setState({error:true})
            	//document.getElementById("error").innerHTML="Lo sentimos, hay errores por resolver"
            } else if(auxStatus == "404") {
            	this.setState({error:true})
            }
          })

    }



    render() {
    	if(this.state.error == true) {
    		return <div className="body">
	    			<label className="titulo-comp-cita">Video consulta </label>
	    			<label>No hay ningun video enlazado a esta consulta</label>
		    		
    			</div>

    	} else {
    		return <div className="body">
	    			<label className="titulo-comp-cita">Video consulta </label>
	    			<div className="col2">
	    				<label>Nombre del video: </label> <br></br>
	    				<label>{this.state.nombreVideo}</label><br></br>

	    				<label>Conversación: </label> <br></br>
	    				<pre>{this.state.conversacion}</pre>

	    			</div>
	    			<div className="col2">
		    			<div className="content-video">
			    			<video controls>
							  <source src="./../videos/OneHealth_Grande.mp4" type="video/mp4"></source>
							</video>

			    		</div>
	    			</div>
		    		
    			</div>

    	}
    	


	}
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default ComponenteVideo