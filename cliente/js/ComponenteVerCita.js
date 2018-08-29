import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ComponenteVerCita extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false
        };
        this.errores = this.errores.bind(this)
        this.volver = this.volver.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    volver(){
        this.props.ocultar()
    }


    render(){

        return <div className = "body-cita-videollamada">
            <label className="titulo-comp-cita"> Cita </label>
            <div className="clear"></div>
            <div className="content">
                <div className="col2">

                    <label className="titulo-mediano">Paciente</label>
                    <div className="parrafo">
                        <label className="label">Nombre:</label> <label>{this.props.cita.nombrePac}</label><br></br>
                        <label className="label">Apellidos:</label> <label>{this.props.cita.apellidosPac}</label><br></br>
                        <label className="label">Email:</label> <label>{this.props.cita.emailPac}</label><br></br>
                    </div>
                    <label className="titulo-mediano">Cita</label>
                    <div className="parrafo">
                        <label className="label">Fecha:</label> <label>{this.props.cita.fecha}</label><br></br>
                        <label className="label">Hora:</label> <label>{this.props.cita.hora}</label><br></br>
                    </div>
                </div>
                <div className="col2">
                    <label className="titulo-mediano">Médico</label>
                    <div className="parrafo">
                        <label className="label">Nombre:</label> <label>{this.props.cita.nombreMed}</label><br></br>
                        <label className="label">Apellidos:</label> <label>{this.props.cita.apellidosMed}</label><br></br>
                        <label className="label">Especialidad:</label> <label>{this.props.cita.especialidad}</label><br></br>
                    </div>
                    <div className="parrafo button-cita-video">
                    </div>
                </div>
               
            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="boton-volver-cita"><button onClick={this.volver} className="button">Volver</button></div>
            
        </div>
        
        
    }
}

export default ComponenteVerCita