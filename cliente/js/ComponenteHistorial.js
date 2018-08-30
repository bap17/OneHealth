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
          detalle: false
        };
        this.errores = this.errores.bind(this)
        this.verHistorial = this.verHistorial.bind(this)
        this.verBusqueda=this.verBusqueda.bind(this)
        this.detalleConsulta = this.detalleConsulta.bind(this)
        this.ocultarDetalles= this.ocultarDetalles.bind(this)
        this.verVideo= this.verVideo.bind(this)
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
        this.props.verVideo(this.state.consulta.id)
    }

    verHistorial(){
        var aux =this.props
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')
        var sip = this.campoSip.value

        new API().VerHistorial(id,sip,token).then(datos=>{
            if(datos.status!=200){
                //console.log(datos)
                auxStatus=datos.status.toString()
                auxMensaje=datos.message.toString()
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
                console.log(auxMensaje)
                //document.getElementById('error').value="Hay errores en el formulario"
            }else if(auxStatus=="403"){
                //document.getElementById("error").value="No tienes autorización para ésta función"
            }
            else if(auxStatus=="404"){
                //document.getElementById("error").value="No tienes autorización para ésta función"
            }
        }).catch(e => {
            console.log(e)
          })
    }

    render(){
        if(this.state.busqueda && !this.state.detalle){
            var tipo = localStorage.getItem('tipo')
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
        }else if(this.state.busqueda && this.state.detalle){
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

        }else{
            return <div className="historial">
                <label className="titulo-comp-cita">Historial clínico y consultas </label>
                <div className="">
                    <input type="text" className="input input-pequeño input-buscarsip" placeholder="SIP..." ref={(campo)=>{this.campoSip=campo}}/>
                    <button className="button" type="button" onClick={this.verHistorial}>Buscar</button>
                </div>
            </div>
        }
    }
}

export default ComponenteHistorial