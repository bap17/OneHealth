import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteConfirmarLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
          confirmado: false,  
          error: false
        };
        this.errores = this.errores.bind(this)
        this.confirmacion = this.confirmacion.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    confirmacion(){
        var cod = {
            codigo: this.campoCodigo.value
        }
        var aux = this.props
        var auxStatus
        new API().Confirmacion(cod).then(datos=>{
            if(datos.status!=200){
              auxStatus=datos.status.toString()
              this.errores()
            }else{
              datos.json().then(function(resp){
                localStorage.setItem('token', resp.token)
                localStorage.setItem('id', resp.usuario.id) 
                localStorage.setItem('username', resp.usuario.username)
                localStorage.setItem('tipo', resp.usuario.tipo) 
                aux.handleLoginOK() 
              })   
            }         
          }).then(function(){
            if(auxStatus=="400"){
              document.getElementById("error").value="Debes de poner el código de confirmación"
            }else if(auxStatus=="401"){
              document.getElementById("error").value="Código incorrecto"
            }
          }).catch(e => {
              console.log(e)
            })
    }

    render(){  
        return <div className="confirmar">
            <img src="./../img/logo.png"></img>
            <br></br>
            <label className="titulo-login">Verificación en dos pasos</label>
            <br></br>
            <label className="texto-confirmar">Se te acaba de enviar un correo con un código de confirmación</label>
            <div className="form-codigo">
                <label>Código</label>
                <input type="email" className="input" id="cod" placeholder="Introduce el código" ref={(campo)=>{this.campoCodigo=campo}}/>
            </div>
            <button type="submit" className="button" onClick={this.confirmacion}>Comprobar</button>
        </div>
        
    }
    
}
export default ComponenteConfirmarLogin