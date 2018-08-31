import React, { Component } from 'react'
import API from './servicios/api'
import ListarConsul from './ComponenteListarConsultas'

class ComponenteHistorial extends Component {
    constructor(props) {
        super(props)
        var consultas=[]
        var historial=[]
        this.state = {  
          error: false,
          consultas: consultas,
          historial: historial,
          busqueda: false,
          sinConsultas: false,
          consulta: undefined,
          detalle: false,
          historialPac: this.verHistorialPac(),
          paciente: false
        };
        this.errores = this.errores.bind(this)
        this.verHistorial = this.verHistorial.bind(this)
        this.verBusqueda=this.verBusqueda.bind(this)
        this.detalleConsulta = this.detalleConsulta.bind(this)
        this.ocultarDetalles= this.ocultarDetalles.bind(this)
        this.verVideo= this.verVideo.bind(this)
        this.verHistorialPac = this.verHistorialPac.bind(this)
    }

    setPaciente(){
        this.setState({paciente:true})
    }

    errores(){
        this.setState({error:true})
    }

    verBusqueda(){
        this.setState({busqueda:true})
    }

    detalleConsulta(consul){
        this.setState({consulta:consul})
        this.setState({detalle:true})
    }

    ocultarDetalles(){
        this.setState({detalle:false})
    }

    verVideo(){
        this.props.verVideo()
    }

    verHistorial(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')
        var sip = this.campoSip.value

        new API().VerHistorial(id,sip,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({historial:resp.historial})
                    if(resp['consultas anteriores']==undefined){
                        this.setState({sinConsultas: true})
                    }
                    else{
                        this.setState({consultas:resp['consultas anteriores']})
                    }
                    this.verBusqueda()
                })
               
            }             
        }).then(function(){
            if(auxStatus=="400"){
                document.getElementById('error').innerHTML="Debes introducir la SIP del paciente"
            }else if(auxStatus=="403"){
                document.getElementById("error").innerHTML="No tienes autorización para ésta función"
            }
            else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="No se ha encontrado el historial del paciente"
            }else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
        }).catch(e => {
            console.log(e)
          })
    }

    verHistorialPac(){
        var auxStatus
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        return new API().VerHistorialPaciente(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                //this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({historialPac:resp.historial})
                })
               
            }           
        }).then(function(){
            if(auxStatus=="404"){
                document.getElementById('error').innerHTML="No se ha encontrado el historial del paciente"
            }
        }).catch(e => {
            console.log(e)
          })
        
    }

    

    render(){
        var tipo = localStorage.getItem('tipo')
        if(this.state.busqueda && !this.state.detalle && tipo=="medico"){
            return <div className="historial">
                <label className="titulo-comp-cita">Historial clínico y consultas </label>
                <div className="">
                    <input type="text" className="input input-pequeño input-buscarsip" placeholder="SIP..." ref={(campo)=>{this.campoSip=campo}}/>
                    <button className="button" type="button" onClick={this.verHistorial}>Buscar</button>  
                </div>
                <div className="col2">
                    <div className= "card">
                        <div className="card-header">Historial clínico</div>
                        <div className="card-body">
                            <p>Nombre: {this.state.historial.nombre}</p>
                            <p>NIF: {this.state.historial.nif}</p>
                            <p>Edad: {this.state.historial.edad}</p>
                            <p>Sexo: {this.state.historial.sexo}</p>
                            <p>Nacionalidad: {this.state.historial.nacionalidad}</p>
                            <p>Estado civil: {this.state.historial['estado civil']}</p>
                            <p>Ocupación: {this.state.historial.ocupacion}</p>
                            <p>Lugar de origen: {this.state.historial['lugar de origen']}</p>
                            <p>Domicilio: {this.state.historial.domicilio}</p>
                            <p>Alergias: {this.state.historial.alergias}</p>
                            <p>Peso: {this.state.historial.peso} kg.</p>
                            <p>Altura: {this.state.historial.altura}</p>
                            <p>SIP: {this.state.historial.sip}</p>
                        </div>
                    </div>
                </div>
                <div className= "col2">
                { this.state.sinConsultas ? <div className="card">
                    <div className="card-header">Consultas</div>
                    <div className="card-body">
                    <ul className="list-group"> No tiene consultas registradas </ul>
                    </div>
                </div> : <ListarConsul handleDetalle={this.detalleConsulta} consultas={this.state.consultas}/>} 
                        </div>
            </div>
        }else if(this.state.busqueda && this.state.detalle && tipo=="medico"){
            return <div className="consulta">
                <label className="titulo-comp-cita">Consulta </label>
                <br></br>
                <a onClick={this.ocultarDetalles}>Historial </a><label> > Consulta</label>
                <div className="form-consulta">
                    <label>Paciente: </label>&nbsp;
                    <input disabled className="input input-pequeño" value={this.state.historial.nombre}></input>
                    <a onClick={this.verVideo}>Ver video consulta</a>
                </div>
                <div className="datos-consulta">
                    <label>Motivo:</label>
                    <textarea disabled className="textarea" rows="3" value={this.state.consulta.motivo}></textarea>
                    <label>Enfermedad:</label>
                    <textarea disabled className="textarea" rows="3" value={this.state.consulta.enfermedad_actual}></textarea>
                    <label>Diagnóstico:</label>
                    <textarea disabled className="textarea" rows="3" value={this.state.consulta.diagnostico}></textarea>
                    <label>Tratamiento:</label>
                    <textarea disabled className="textarea" rows="3" value={this.state.consulta.tratamiento}></textarea>
                </div>
            </div>

        }else if(!this.state.busqueda && !this.state.detalle && tipo=="medico"){
            return <div className="historial">
                <label className="titulo-comp-cita">Historial clínico y consultas </label>
                <div className="">
                    <input type="text" className="input input-pequeño input-buscarsip" placeholder="SIP..." ref={(campo)=>{this.campoSip=campo}}/>
                    <button className="button" type="button" onClick={this.verHistorial}>Buscar</button>
                </div>
                <br></br>
                {this.state.error ?

                    <p id="error" className="error"></p>: 
                    <p className="error"></p>
                }
            </div>
        }else if(tipo=="paciente" && !this.state.paciente){
            return <div className="historial">
                <label className="titulo-comp-cita">Historial clínico </label>
                <br></br>
                <div className="col2">
                <br></br>
                {this.state.error ?

                    <p id="error" className="error"></p>: 
                    <p className="error"></p>
                }
                    <div className= "card">
                        <div className="card-header">Historial clínico</div>
                        <div className="card-body">
                            <p>Nombre: {this.state.historialPac.nombre}</p>
                            <p>NIF: {this.state.historialPac.nif}</p>
                            <p>Edad: {this.state.historialPac.edad}</p>
                            <p>Sexo: {this.state.historialPac.sexo}</p>
                            <p>Nacionalidad: {this.state.historialPac.nacionalidad}</p>
                            <p>Estado civil: {this.state.historialPac['estado civil']}</p>
                            <p>Ocupación: {this.state.historialPac.ocupacion}</p>
                            <p>Lugar de origen: {this.state.historialPac['lugar de origen']}</p>
                            <p>Domicilio: {this.state.historialPac.domicilio}</p>
                            <p>Alergias: {this.state.historialPac.alergias}</p>
                            <p>Peso: {this.state.historialPac.peso} kg.</p>
                            <p>Altura: {this.state.historialPac.altura}</p>
                            <p>SIP: {this.state.historialPac.sip}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}

export default ComponenteHistorial