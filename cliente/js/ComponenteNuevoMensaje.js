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
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        var mensaje={
            mensaje: this.campoTexto.value,
            asunto: this.campoAsunto.value,
            destinatario: this.campoPara.value
        }

        new API().NuevoMensaje(id,mensaje,token).then(datos=>{
            if(datos.status!=201){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.enviado()
                })
            }             
        }).then(function(){
            if(auxStatus=="400"){
                document.getElementById('error').innerHTML="Alguno de los campos es inválido o vacío"
            }else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
            else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="No se ha encontrado el destinatario"
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
            <br></br>
            {this.state.error ?

                <p id="error" className="error"></p>: 
                <p className="error"></p>
            }
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