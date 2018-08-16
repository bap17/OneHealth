import React, { Component } from 'react'
import API from './servicios/api'

class ComponenteRegistro extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false,
          tipo: false// false para paciente, true para medico
        };
        this.errores = this.errores.bind(this)
        this.returnLogin = this.returnLogin.bind(this)
        this.registro = this.registro.bind(this)
        this.tipoPaciente = this.tipoPaciente.bind(this)
        this.tipoMedico = this.tipoMedico.bind(this)
    }

    returnLogin(){
        this.props.handleRegistroOK()
    }

    errores(){
        this.setState({error:true})
    }

    tipoPaciente(){
        this.setState({tipo:false})
    }

    tipoMedico(){
        this.setState({tipo:true})
    }

    registro(){
        var nuevoUser
        if(!this.state.tipo){
            nuevoUser = {
                username: this.campoLogin.value,
                email: this.campoEmail.value,
                password: this.campoPassword.value,
                tipo: 1,
                sip: this.campoSip.value
            }
        }else{
            nuevoUser = {
                username: this.campoLogin.value,
                email: this.campoEmail.value,
                password: this.campoPassword.value,
                tipo: 0,
                especialidad: this.campoEspecialidad.value
            }
        }
        var aux =this.props
        var auxStatus

        new API().RegistroP(nuevoUser).then(datos=>{
            //console.log(datos)
            if(datos.status!=201){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                aux.handleRegistroOK()
            }
                      
        }).then(function(){
            if(auxStatus=="400"){
                console.log(auxStatus)
                //document.getElementById('error').value="Hay errores en el formulario"
            }else if(auxStatus=="409"){
                document.getElementById("error").value="Ya hay un usuario con el mismo nombre de usuario"
            }
        }).catch(e => {
            console.log(e)
          })
    }

    render(){
        if(!this.state.tipo){
            return <div className="registro">
                <img src="./../img/logo.png"></img>
                <br></br>
                <label className="titulo-login">Registro</label>
                <div className="form-login">
                    <div className="form-group">
                        <label>Tipo</label>
                        <select className="form-control" onChange={this.tipoMedico} ref={(campo)=>{this.campoTipo=campo}}>
                            <option>Usuario</option>
                            <option>Médico</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="input" placeholder="Enter email" ref={(campo)=>{this.campoEmail=campo}}/>
                    </div>
                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input type="email" className="input" placeholder="Enter username" ref={(campo)=>{this.campoLogin=campo}}/>
                    </div>
                    <div className="form-group">
                        <label>SIP</label>
                        <input type="email" className="input" placeholder="Enter SIP" ref={(campo)=>{this.campoSip=campo}}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="input" placeholder="Password" ref={(campo)=>{this.campoPassword=campo}}/>
                    </div>
                </div>
                <button type="submit" className="button" onClick={this.registro}>Registrarme</button>
                <br></br>
                <a onClick={this.returnLogin}>Iniciar sesión</a>
            </div>
        }else{
            return <div className="registro">
                <img src="./../img/logo.png"></img>
                <br></br>
                <label className="titulo-login">Registro</label>
                <div className="form-login">
                    <div className="form-group">
                        <label>Tipo</label>
                        <select className="form-control" onChange={this.tipoPaciente} ref={(campo)=>{this.campoTipo=campo}}>
                            <option>Usuario</option>
                            <option selected>Médico</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="input" placeholder="Enter email" ref={(campo)=>{this.campoEmail=campo}}/>
                    </div>
                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input type="email" className="input" placeholder="Enter username" ref={(campo)=>{this.campoLogin=campo}}/>
                    </div>
                    <div className="form-group">
                        <label>Especialidad</label>
                        <select className="form-control" ref={(campo)=>{this.campoEspecialidad=campo}}>
                            <option>Cirujano</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="input" placeholder="Password" ref={(campo)=>{this.campoPassword=campo}}/>
                    </div>
                </div>
                <button type="submit" className="button" onClick={this.registro}>Registrarme</button>
                <br></br>
                <a onClick={this.returnLogin}>Iniciar sesión</a>
            </div>
        }
    }
    
}
export default ComponenteRegistro