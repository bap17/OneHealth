import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false,
          metodo: 0 //0 para validar medico, 1 para nuevo historial
        };
        this.errores = this.errores.bind(this)
        this.cambiarMetodo = this.cambiarMetodo.bind(this)
        this.historial = this.historial.bind(this)
        this.validar = this.validar.bind(this)
        this.salir = this.salir.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    cambiarMetodo(){
        this.setState({metodo:this.campoMetodo.value})
    }

    salir(){
        this.props.salir()
    }

    validar(){
        var auxStatus
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')
        var medico = {medico:this.campoUser.value}

        new API().ValidarMedico(id,medico,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    alert(resp.message)
                })
            }
                      
        }).then(function(){
            if(auxStatus=="400"){
                document.getElementById('error').innerHTML="Alguno de los campos es inválido o vacío"
            }else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="No existe el usuario"
            }
            else if(auxStatus=="403"){
                document.getElementById("error").innerHTML="No tienes autorizacion para ésta función"
            }
            else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
        }).catch(e => {
            console.log(e)
          })
    }

    historial(){
        
        var historial = {
            "paciente": this.campoUser.value,
            "nombre": this.campoNombre.value,
            "nif": this.campoNif.value,
            "edad": this.campoEdad.value,
            "sexo": this.campoSexo.value,
            "nacionalidad": this.campoNacion.value,
            "estado": this.campoEstado.value,
            "ocupacion": this.campoOcupa.value,
            "origen": this.campoOrigen.value,
            "domicilio": this.campoDomi.value,
            "alergias": this.campoAlergias.value,
            "peso": this.campoPeso.value,
            "altura": this.campoAltura.value,
            "antecedentes": this.campoAnte.value
        }
        
        var auxStatus
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().NuevoHistorial(id,historial,token).then(datos=>{
            if(datos.status!=201){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    alert(resp.message)
                })
            }
                      
        }).then(function(){
            if(auxStatus=="400"){
                document.getElementById('error').innerHTML="Alguno de los campos es inválido o vacío"
            }else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="No existe el usuario"
            }
            else if(auxStatus=="403"){
                document.getElementById("error").innerHTML="No tienes autorizacion para ésta función"
            }
            else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
        }).catch(e => {
            console.log(e)
          })
    }


    render(){
        if(this.state.metodo==0){
            return <div className="admin">
            <img src="./../img/logo.png"></img>
            <br></br>
            <label className="titulo-login">Administrador</label>
            <div className="form-login">
                <br></br>
                {this.state.error ?
                    <p id="error" className="error"></p>: 
                    <p className="error"></p>
                }
                <div className="form-group">
                    <label>Método</label>
                    <select className="form-control" onChange={this.cambiarMetodo} ref={(campo)=>{this.campoMetodo=campo}}>
                        <option value="0" defaultValue>Validar médico</option>
                        <option value="1">Nuevo historial</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>ID del médico</label>
                    <input  className="input"  ref={(campo)=>{this.campoUser=campo}}/>
                </div>
            </div>
            <button type="submit" className="button" onClick={this.validar}>Validar</button>
            <br></br>
            <a onClick={this.salir}>Salir</a>
        </div>
        }else{
            return <div className="admin">
            <img src="./../img/logo.png"></img>
            <br></br>
            <label className="titulo-login">Administrador</label>
            <div className="form-login">
                <br></br>
                {this.state.error ?
                    <p id="error" className="error"></p>: 
                    <p className="error"></p>
                }
                <div className="form-group">
                    <label>Método</label>
                    <select className="form-control" onChange={this.cambiarMetodo} ref={(campo)=>{this.campoMetodo=campo}}>
                        <option value="0" defaultValue>Validar médico</option>
                        <option value="1">Nuevo historial</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>ID del paciente</label>
                    <input  className="input"  ref={(campo)=>{this.campoUser=campo}}/>
                </div>
                <div className="form-group">
                    <label>Nombre completo</label>
                    <input  className="input"  ref={(campo)=>{this.campoNombre=campo}}/>
                </div>
                <div className="form-group">
                    <label>NIF</label>
                    <input  className="input"  ref={(campo)=>{this.campoNif=campo}}/>
                </div>
                <div className="form-group">
                    <label>Edad</label>
                    <input  className="input"  ref={(campo)=>{this.campoEdad=campo}}/>
                </div>
                <div className="form-group">
                    <label>Sexo</label>
                    <select className="form-control" ref={(campo)=>{this.campoSexo=campo}}>
                        <option >Mujer</option>
                        <option >Hombre</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Nacionalidad</label>
                    <input  className="input"  ref={(campo)=>{this.campoNacion=campo}}/>
                </div>
                <div className="form-group">
                    <label>Estado civil</label>
                    <input  className="input"  ref={(campo)=>{this.campoEstado=campo}}/>
                </div>
                <div className="form-group">
                    <label>Ocupación</label>
                    <input  className="input"  ref={(campo)=>{this.campoOcupa=campo}}/>
                </div>
                <div className="form-group">
                    <label>Lugar de origen</label>
                    <input  className="input"  ref={(campo)=>{this.campoOrigen=campo}}/>
                </div>
                <div className="form-group">
                    <label>Domicilio</label>
                    <input  className="input"  ref={(campo)=>{this.campoDomi=campo}}/>
                </div>
                <div className="form-group">
                    <label>Alergias</label>
                    <textarea className="textarea" rows="3" ref={(campo)=>{this.campoAlergias=campo}}></textarea>
                </div>
                <div className="form-group">
                    <label>Peso (Kg)</label>
                    <input  className="input"  ref={(campo)=>{this.campoPeso=campo}}/>
                </div>
                <div className="form-group">
                    <label>Altura (m)</label>
                    <input  className="input"  ref={(campo)=>{this.campoAltura=campo}}/>
                </div>
                <div className="form-group">
                    <label>Antecedentes</label>
                    <textarea className="textarea" rows="3" ref={(campo)=>{this.campoAnte=campo}}></textarea>
                </div>
            </div>
            <button type="submit" className="button" onClick={this.historial}>Guardar</button>
            <br></br>
            <a onClick={this.salir}>Salir</a>
        </div>
        }
        
            
        
        
    }
}

export default ComponenteAdmin