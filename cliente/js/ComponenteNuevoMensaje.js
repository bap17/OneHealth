import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteNuevoMensaje extends Component{

	constructor(props) {
        super(props)
        this.state = {  
          error: false
        };
        this.errores = this.errores.bind(this)
        this.nuevoMensaje = this.nuevoMensaje.bind(this)
        this.volver=this.volver.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    nuevoMensaje(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        var mensaje={
            mensaje: this.campoTexto.value,
            asunto: this.campoAsunto.value,
            destinatario: this.campoPara.value
        }

        new API().NuevoMensaje(id,mensaje,token).then(datos=>{
            if(datos.status!=201){
                console.log(datos)
                auxStatus=datos.status.toString()
                //auxMensaje=datos.message.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    console.log(resp.message)
                    this.enviado()
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

    volver(){
        this.props.cancelar()
    }

    enviado(){
        this.props.handleEnviado()
    }

    render(){
        return <div className="mensajes">
            <label className="titulo-comp-cita">Nuevo Mensaje</label>
            <br></br>
            <div className="nuevo-mensaje">
                <label>Para: </label>
                <input className="input" ref={(campo)=>{this.campoPara=campo}}></input>
                <label>Asunto: </label>
                <input className="input" ref={(campo)=>{this.campoAsunto=campo}}></input>
                <label>Mensaje: </label>
                <textarea className="textarea" rows="3" ref={(campo)=>{this.campoTexto=campo}}></textarea>
            </div>
            <div className="enviar-mensaje">
                <button onClick={this.nuevoMensaje} className="button">Enviar</button>
                <a onClick={this.volver}>Cancelar</a>
            </div>
            
        </div>
    }
}

export default ComponenteNuevoMensaje