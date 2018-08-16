import React, { Component } from 'react'
import API from './servicios/api'
import Registro from './ComponenteRegistro'

class ComponenteLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
          registrado: true,
          error: false
        };
        this.login = this.login.bind(this)
        this.registroOK=this.registroOK.bind(this)
        this.registroNO=this.registroNO.bind(this)
        this.errores = this.errores.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    registroOK() {
        this.setState({registrado:true})
    }
    
    registroNO() {
        this.setState({registrado:false})
    }

    login(){
        //evento.preventDefault()
        var nuevoUser = {
            username: this.campoUser.value,
            password: this.campoPassword.value,
        }
        var aux = this.props
        var auxStatus
        new API().Login(nuevoUser).then(datos=>{
            if(datos.status!=200){
              console.log(datos)  
              auxStatus=datos.status.toString()
              this.errores()
            }else{
              datos.json().then(function(resp){
                aux.handleConfirmacion() 
              })   
            }         
          }).then(function(){
            if(auxStatus=="400"){
              document.getElementById("error").value="Error en el login"
            }else if(auxStatus=="404"){
              document.getElementById("error").value="No existe el usuario"
            }else if(auxStatus=="401"){
              document.getElementById("error").value="Constraseña incorrecta"
            }
          }).catch(e => {
              console.log(e)
            })
    }

    render(){
        if(this.state.registrado){
            return <div className= "login">
                <img src="./../img/logo.png"></img>
                <br></br>
                <label className="titulo-login">Iniciar sesión</label>
                <div className="form-login">
                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input  className="input" id="exampleInputEmail1"  placeholder="Nombre de usuario" ref={(campo)=>{this.campoUser=campo}}/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" className="input" id="exampleInputPassword1" placeholder="Contraseña" ref={(campo)=>{this.campoPassword=campo}}/>
                    </div>
                </div>
                <button type="submit" className="button" onClick={this.login}>Iniciar sesión</button>
                <br></br>
                <p className="p-registro">¿Nuevo usuario?&nbsp;<a onClick={this.registroNO}>Regístrate</a></p>
            </div>
        }else{
            return <Registro handleRegistroOK={this.registroOK}/>
        }
    }


}

export default ComponenteLogin