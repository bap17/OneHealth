import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteNuevaConsulta extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false
        };
        this.errores = this.errores.bind(this)
        this.nuevaConsulta = this.nuevaConsulta.bind(this)
        this.volver = this.volver.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    volver(){
        this.props.handleVolver()
    }

    nuevaConsulta(){
        var nueva = {
            motivo: this.campoMotivo.value,
            enfermedad: this.campoEnfermedad.value,
            diagnostico: this.campoDiagnostico.value,
            tratamiento: this.campoTratamiento.value,
            sip: this.campoSip.value
        }
       
        var auxStatus
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().NuevaConsulta(id,nueva,token).then(datos=>{
            if(datos.status!=201){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    alert(resp.message)
                    this.volver()
                    console.log(resp.message)
                })
               
            }             
        }).then(function(){
            if(auxStatus=="400"){
                document.getElementById('error').innerHTML="El campo SIP es obligatorio"
            }else if(auxStatus=="403"){
                document.getElementById("error").innerHTML="No tienes autorización para ésta función"
            }
            else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="No se ha encontrado el historial del paciente"
            }
            else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
        }).catch(e => {
            console.log(e)
          })
    }

    render(){
        return <div className="nueva-consulta">
            <label className="titulo-comp-cita">Nueva consulta </label>
            <div className="form-Nconsulta">
            <br></br>
            {this.state.error ?

                <p id="error" className="error"></p>: 
                <p className="error"></p>
            }
                <div className="form-group">
                    <label>SIP del paciente</label>
                    <input className="input" placeholder="Enter SIP" ref={(campo)=>{this.campoSip=campo}}/>  
                </div>
                <div className="form-group">
                    <label>Motivo</label>
                    <input className="input" ref={(campo)=>{this.campoMotivo=campo}}/>
                </div>
                <div className="form-group">
                    <label>Enfermedad actual</label>
                    <textarea className="textarea" rows="3" ref={(campo)=>{this.campoEnfermedad=campo}}></textarea>
                </div>
                <div className="form-group">
                    <label>Diagnostico</label>
                    <textarea className="textarea" rows="3" ref={(campo)=>{this.campoDiagnostico=campo}}></textarea>
                </div>
                <div className="form-group">
                    <label>Tratamiento</label>
                    <textarea className="textarea" rows="3" ref={(campo)=>{this.campoTratamiento=campo}}></textarea>
                </div>
            </div>
            <button type="submit" className="button" onClick={this.nuevaConsulta}>Guardar</button>
            <a onClick={this.volver}>Cancelar</a>
        </div>
    }
}

export default ComponenteNuevaConsulta