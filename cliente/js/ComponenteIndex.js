import React, { Component } from 'react';
import { render } from 'react-dom';
import Inicio from './ComponenteInicio'
import Login from './ComponenteLogin'
import Confirmar from './ComponenteConfirmarLogin'

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
    
  }

  loginOK() {
    this.setState({logged:true})
  }

  logoutOK() {
    this.setState({logged:false})
  }

  confirmacion(){
      this.setState({confirmado:true})
  }

  confirmacionNO(){
    this.setState({confirmado:false})
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