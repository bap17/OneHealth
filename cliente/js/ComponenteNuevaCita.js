import React, { Component } from 'react'
import API from './servicios/api'
import DayPickerInput from 'react-day-picker/DayPickerInput';
//import 'react-day-picker/lib/style.css';
import Medico from './ComponenteMedico';

class ComponenteNuevaCita extends Component {
    constructor(props) {
        super(props)
        this.state = {
          error: false,
          selectedDay: undefined,
          medicos: []
        };
        this.errores = this.errores.bind(this)
        this.crearCita = this.crearCita.bind(this)
        this.handleDayChange = this.handleDayChange.bind(this)
        this.obtenerMedicos = this.obtenerMedicos.bind(this)
        this.volver = this.volver.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    volver(){
        this.props.handleVolver()
    }

    crearCita(){
        if(this.state.selectedDay==undefined){
            this.errores()
        }else{
            var nuevaCita = {
                fecha: this.state.selectedDay.toISOString().substring(0, 10),
                hora: this.campoHora.value,
                medico: this.campoMedico.value,
                tipo: this.campoTipo.value,
                paciente: this.campoSip.value
            }
       }        
        var auxStatus
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().CrearCita(id,nuevaCita,token).then(datos=>{
            if(datos.status!=201){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    alert(resp.message+ ". El codigo es: "+resp.codigo)
                    this.volver()
                })
               
            }             
        }).then(function(){
            if(auxStatus=="400"){
                document.getElementById('error').innerHTML="Alguno de los parámetros es inválido o vacío"
            }else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
            else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="No se ha encontrado al paciente, comprueba la SIP"
            }
        }).catch(e => {
            console.log(e)
          })

    }

    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }

    obtenerMedicos(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().ListadoMedicos(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                //this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({medicos:resp.medicos})
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

    componentDidMount(){
        this.obtenerMedicos()
    }

    render(){
        var med = []
        for(var i=0; i<this.state.medicos.length;i++) {
            var elemento
            elemento = <Medico medico={this.state.medicos[i]} key={i}/>
            med.push(elemento)
        }
        var format='YYYY/M/D'
        return <div className="nueva-cita">
        <label className="titulo-comp-cita">Nueva cita </label>
        <div className="form-cita">
        <br></br>
            {this.state.error ?

                <p id="error" className="error"></p>: 
                <p className="error"></p>
            }
            <div className="body-cita">
            <label>SIP</label>
            <br></br>
            <input className="input" placeholder="Enter SIP" ref={(campo)=>{this.campoSip=campo}}/>
            <div className="fecha-hora">
                <label>Fecha</label>
                <br></br>
                <DayPickerInput format={format} onDayChange={this.handleDayChange} />
                <br></br>
                <label>Hora</label>
                <select className="form-control" ref={(campo)=>{this.campoHora=campo}}>
                    <option>8:00</option>
                    <option>8:30</option>
                    <option>9:00</option>
                    <option>9:30</option>
                    <option>10:00</option>
                    <option>10:30</option>
                    <option>11:00</option>
                    <option>11:30</option>
                    <option>12:00</option>
                    <option>12:30</option>
                    <option>13:00</option>
                    <option>13:30</option>
                    <option>14:00</option>
                    <option>14:30</option>
                    <option>15:00</option>
                    <option>15:30</option>
                    <option>16:00</option>
                    <option>16:30</option>
                    <option>17:00</option>
                    <option>17:30</option>
                    <option>18:00</option>
                    <option>18:30</option>
                    <option>19:00</option>
                    <option>19:30</option>
                </select>
            </div>
            <div className="form-group">
                <label>Tipo de cita</label>
                <select className="form-control" ref={(campo)=>{this.campoTipo=campo}}>
                    <option value="1">Videollamada</option>
                    <option value="0">Presencial</option>
                </select>
            </div>
            <div className="form-group">
                <label>Médico</label>
                <select className="form-control" ref={(campo)=>{this.campoMedico=campo}}>
                    {med}
                </select>
            </div>
        </div>
        <button type="submit" className="button" onClick={this.crearCita}>Crear</button>
        </div>
        </div>
    }
}

export default ComponenteNuevaCita