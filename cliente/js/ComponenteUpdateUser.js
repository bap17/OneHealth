import React, { Component } from 'react'
import API from './servicios/api'


class ComponenteUpdateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
          error: false,
          datos: this.getDatos()
        };
        this.errores = this.errores.bind(this)
        this.actualizarDatos=this.actualizarDatos.bind(this)
        this.volver = this.volver.bind(this)
        this.getDatos = this.getDatos.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    volver(){
        this.props.handleVolver()
    }

    getDatos(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        return new API().DatosUsuario(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
            }else{
                datos.json().then(resp=>{
                    console.log(resp.user)
                    this.setState({datos:resp.user})
                })
               
            }           
        })
    }

    actualizarDatos(){
        var usu = {
            nombre: this.campoNombre.value,
            apellidos: this.campoApellidos.value
        }
       
        var auxStatus
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().UpdateUsuario(id,usu,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    alert(resp.message)
                    this.volver()
                })
               
            }             
        }).then(function(){
            if(auxStatus=="400"){
                document.getElementById('error').innerHTML="Faltan campos por rellenar"
            }
            else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="El usuario no existe"
            }else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
        }).catch(e => {
            console.log(e)
          })
    }
    
    render(){
        return <div className="act-pass">
            <label className="titulo-comp-cita">Datos personales </label>
            <div className="form-cita">
            <br></br>
            {this.state.error ?

                <p id="error" className="error"></p>: 
                <p className="error"></p>
            }
                <div className="body-cita">
                    <label>Nombre</label>
                    <input  className="input" defaultValue={this.state.datos.nombre} ref={(campo)=>{this.campoNombre=campo}}/>
                    <label>Apellidos</label>
                    <input className="input" defaultValue={this.state.datos.apellidos} ref={(campo)=>{this.campoApellidos=campo}}/>
                </div>
                <button type="submit" className="button" onClick={this.actualizarDatos}>Guardar</button>
            </div>
        </div>
    }
}

export default ComponenteUpdateUser