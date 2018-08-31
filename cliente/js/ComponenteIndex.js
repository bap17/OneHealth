import React, { Component } from 'react';
import { render } from 'react-dom';
import Inicio from './ComponenteInicio'
import Login from './ComponenteLogin'
import Confirmar from './ComponenteConfirmarLogin'
import Api from './servicios/api'

class ComponenteIndex extends Component {
  constructor() {
    super();
    this.state = {
      logged: false,
      confirmado: false
    };
    this.loginOK = this.loginOK.bind(this)
    this.logoutOK= this.logoutOK.bind(this)
    this.confirmacion=this.confirmacion.bind(this)
    this.confirmacionNO=this.confirmacionNO.bind(this)
    this.cambiarEstado=this.cambiarEstado.bind(this)
    
  }

  loginOK() {
    this.cambiarEstado()
    this.setState({logged:true})
   
  }

  logoutOK() {
    this.setState({logged:false})
    this.setState({confirmado:false})
  }

  confirmacion(){
      this.setState({confirmado:true})
  }

  confirmacionNO(){
    this.setState({confirmado:false})
  }

  cambiarEstado() {
    var idUsu = localStorage.getItem('id')
    var token = localStorage.getItem('token')
    var disp = {"disponible": 1}
    new Api().disponible(disp, idUsu, token).then(function(datos){

      if(datos.status!=204) {
        datos.json().then(function(valor){
          console.log(valor.respuesta)
        })
        
      } else {
        console.log("El estado ha cambiado")

        
      }
    })

  }

  render() { 
    var token = localStorage.getItem('token')
      if (!this.state.logged && token==null && !this.state.confirmado){
        return <Login handleConfirmacion={this.confirmacion}/>
      }else if(!this.state.logged && token==null && this.state.confirmado){
        return <Confirmar handleLoginOK={this.loginOK}/>
      }else{
        return <Inicio handleLogout={this.logoutOK}/>
      }
  }
}
export default ComponenteIndex