import React, { Component } from 'react'
import API from './servicios/api'
import Mensaje from './ComponenteMensaje'
import NuevoMensaje from './ComponenteNuevoMensaje'

class ComponenteMensajes extends Component{

	constructor(props) {
        super(props)
        this.state = {  
          error: false,
          recibidos: [],
          enviados: [],
          mensaEnviados: false,
          mensaRecibidos: true,
          nuevo:false,
          detalle:false,
          mensaje: undefined,
          borrado: false,
          enviado: false,
          sinRecibidos:false,
          sinEnviados:false
        };
        this.errores = this.errores.bind(this)
        this.mensajesRecibidos = this.mensajesRecibidos.bind(this)
        this.mensajesEnviados = this.mensajesEnviados.bind(this)
        this.verEnviados = this.verEnviados.bind(this)
        this.verRecibidos = this.verRecibidos.bind(this)
        this.enviar = this.enviar.bind(this)
        this.noEnviar = this.noEnviar.bind(this)
        this.verDetalles = this.verDetalles.bind(this)
        this.ocultarDetalles= this.ocultarDetalles.bind(this)
        this.borrar = this.borrar.bind(this)
        this.nuevoMensaje = this.nuevoMensaje.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    mensajesRecibidos(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().VerRecibidos(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                auxMensaje=datos.message.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    if(resp.mensajes==undefined){
                        this.setState({sinRecibidos:true})
                    }else{
                        this.setState({recibidos:resp.mensajes})
                    }
                    
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

    mensajesEnviados(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().VerEnviados(id,token).then(datos=>{
            if(datos.status!=200){
                //auxStatus=datos.status.toString()
                //auxMensaje=datos.message.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    if(resp.mensajes==undefined){
                        this.setState({sinEnviados:true})
                    }else{
                        this.setState({enviados :resp.mensajes})
                    }
                    
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

    borrar(idMen){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().BorrarMensaje(id,idMen,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                auxMensaje=datos.message.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    console.log(resp.message)
                    this.setState({borrado:true})
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

    verEnviados(){
        this.setState({mensaEnviados: true})
        this.setState({mensaRecibidos: false})
    }

    verRecibidos(){
        this.setState({mensaRecibidos: true})
        this.setState({mensaEnviados: false})
    }

    enviar(){
        this.setState({nuevo:true})
    }

    noEnviar(){
        this.setState({nuevo:false})
    }

    nuevoMensaje(){
        this.setState({enviado:true})
        this.setState({nuevo:false})
        if(this.state.sinEnviados){
            this.setState({sinEnviados:false})
        }
    }

    verDetalles(men){
        this.setState({mensaje:men})
        this.setState({detalle:true})
    }

    ocultarDetalles(){
        this.setState({detalle:false})
    }

    componentDidMount(){
        this.mensajesRecibidos()
        this.mensajesEnviados()
    }

    componentDidUpdate(){
        if(this.state.borrado){
            this.mensajesRecibidos()
            this.mensajesEnviados()
            this.setState({borrado:false})
        }else if(this.state.enviado){
            this.mensajesRecibidos()
            this.mensajesEnviados()
            this.setState({enviado:false})
        }
    }

    render() {
        var menRecibidos = []
        var menEnviados = []

        for(var i=0; i<this.state.recibidos.length;i++) {
            var elemento
            elemento = <Mensaje handleDetalle={this.verDetalles} mensaje={this.state.recibidos[i]} key={i}/>
            menRecibidos.push(elemento)
        }

        for(var i=0; i<this.state.enviados.length;i++) {
            var elemento
            elemento = <Mensaje handleBorrar={this.borrar} handleDetalle={this.verDetalles} mensaje={this.state.enviados[i]} key={i}/>
            menEnviados.push(elemento)
        }
        if(this.state.mensaRecibidos && !this.state.nuevo && !this.state.detalle){
            return <div className="mensajes">
                <label className="titulo-comp-cita">Mensajes</label>
                <br></br>
                <div className="opciones-mensajes">
                    <button onClick={this.enviar} className="button">Nuevo</button>
                    <br></br>
                    <button className="button2">Recibidos</button>
                    <br></br>
                    <button className="button2" onClick={this.verEnviados}>Enviados</button>
                </div>
                <div className="panel-mensajes">
                    <div className="card">
                        <div className="card-header">Mensajes recibidos</div>
                        <div className="card-body">
                            {this.state.sinRecibidos ? <ul className="list-group"> No tienes mensajes </ul>:<ul className="list-group"> {menRecibidos} </ul>}
                        </div>
                    </div>
                </div>
            </div> 
        }else if(this.state.mensaEnviados && !this.state.nuevo && !this.state.detalle){
            return <div className="mensajes">
                <label className="titulo-comp-cita">Mensajes</label>
                <br></br>
                <div className="opciones-mensajes">
                    <button onClick={this.enviar} className="button">Nuevo</button>
                    <br></br>
                    <button className="button2" onClick={this.verRecibidos}>Recibidos</button>
                    <br></br>
                    <button className="button2">Enviados</button>
                </div>
                <div className="panel-mensajes">
                    <div className="card">
                        <div className="card-header">Mensajes enviados</div>
                        <div className="card-body">
                            {this.state.sinEnviados ? <ul className="list-group"> No tienes mensajes </ul> :<ul className="list-group"> {menEnviados} </ul>}    
                        </div>
                    </div>
                </div>
            </div> 
        }else if(this.state.nuevo && !this.state.detalle){
            return <NuevoMensaje handleEnviado={this.nuevoMensaje} cancelar={this.noEnviar}></NuevoMensaje>
        }else{
            return <div className="mensajes">
            <label className="titulo-comp-cita">Mensaje</label>
            <br></br>
            <div className="nuevo-mensaje">
                {this.state.mensaje.tipo == "enviado" ? <label>Para: </label> : <label>De: </label>}
                <input disabled className="input" value={this.state.mensaje.usuario}></input>
                <label>Asunto: </label>
                <input disabled className="input" value={this.state.mensaje.asunto}></input>
                <label>Mensaje: </label>
                <textarea disabled className="textarea" rows="3" value={this.state.mensaje.texto}></textarea>
            </div>
            <div className="enviar-mensaje">
                <button onClick={this.ocultarDetalles} className="button">Volver</button>
            </div>
            
        </div>
        }
	}
}

export default ComponenteMensajes