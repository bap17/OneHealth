import React, { Component } from 'react'
import API from './servicios/api'


class ComponenteUpdatePass extends Component {
    constructor(props) {
        super(props)
        this.state = {
          error: false
        };
        this.errores = this.errores.bind(this)
        this.actualizarPass=this.actualizarPass.bind(this)
        this.volver = this.volver.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    volver(){
        this.props.handleVolver()
    }

    actualizarPass(){
        var pass = {
            password: this.campoPass.value,
            newPassword: this.campoNewPass.value
        }
       
        var auxStatus
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().ActualizarPass(id,pass,token).then(datos=>{
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
            }else if(auxStatus=="401"){
                document.getElementById("error").innerHTML="Contraseña incorrecta"
            }
            else if(auxStatus=="404"){
                document.getElementById("error").innerHTML="El usuario no existe"
            }
            else if(auxStatus=="500"){
                document.getElementById("error").innerHTML="Error en el servidor"
            }
        }).catch(e => {
            console.log(e)
          })
    }
    
    render(){
        return <div className="act-pass">
            <label className="titulo-comp-cita">Contraseña </label>
            <div className="form-cita">
            <br></br>
            {this.state.error ?
                <p id="error" className="error"></p>: 
                <p className="error"></p>
            }
                <div className="body-cita">
                    <label>Contraseña actual</label>
                    <input type="password" className="input"  ref={(campo)=>{this.campoPass=campo}}/>
                    <label>Nueva contraseña</label>
                    <input type="password" className="input"  ref={(campo)=>{this.campoNewPass=campo}}/>
                </div>
                <button type="submit" className="button" onClick={this.actualizarPass}>Guardar</button>
            </div>
        </div>
    }
}

export default ComponenteUpdatePass