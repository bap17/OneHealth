import React, { Component } from 'react'
import API from './servicios/api'
import ListarConsul from './ComponenteListarConsultas'

class ComponenteHistorial extends Component {
    constructor(props) {
        super(props)
        var consultas=[]
        var historial=[]
        this.state = {  
          error: false,
          consultas: consultas,
          historial: historial,
          busqueda: false,
          sinConsultas: false
        };
        this.errores = this.errores.bind(this)
        this.verHistorial = this.verHistorial.bind(this)
        this.verBusqueda=this.verBusqueda.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    verBusqueda(){
        this.setState({busqueda:true})
    }

    verHistorial(){
        var aux =this.props
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')
        var sip = this.campoSip.value

        new API().VerHistorial(id,sip,token).then(datos=>{
            if(datos.status!=200){
                console.log(datos)
                auxStatus=datos.status.toString()
                auxMensaje=datos.message.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({historial:resp.historial})
                    if(resp['consultas anteriores']==undefined){
                        this.setState({sinConsultas: true})
                    }
                    else{
                        this.setState({consultas:resp['consultas anteriores'].consultas})
                    }
                    this.verBusqueda()
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

    render(){
        if(this.state.busqueda){
            var tipo = localStorage.getItem('tipo')
            return <div className="col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="SIP..." ref={(campo)=>{this.campoSip=campo}}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.verHistorial}>Buscar</button>
                    </span>
                </div>
                <div className= "card">
                    <div className="card-body">
                        <p>Nombre: {this.state.historial.nombre}</p>
                        <p>NIF: {this.state.historial.nif}</p>
                        <p>Edad: {this.state.historial.edad}</p>
                        <p>Sexo: {this.state.historial.sexo}</p>
                        <p>Nacionalidad: {this.state.historial.nacionalidad}</p>
                        <p>Estado civil: {this.state.historial['estado civil']}</p>
                        <p>Ocupación: {this.state.historial.ocupacion}</p>
                        <p>Lugar de origen: {this.state.historial['lugar de origen']}</p>
                        <p>Domicilio: {this.state.historial.domicilio}</p>
                        <p>Alergias: {this.state.historial.alergias}</p>
                        <p>Peso: {this.state.historial.peso} kg.</p>
                        <p>Altura: {this.state.historial.altura}</p>
                        <p>SIP: {this.state.historial.sip}</p>
                    </div>
                </div>
                { this.state.sinConsultas ? <div><p>No tiene consultas registradas</p></div> : <ListarConsul consultas={this.state.consultas}/>} 
            </div>
        }else{
            return <div className="col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="SIP..." ref={(campo)=>{this.campoSip=campo}}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.verHistorial}>Buscar</button>
                    </span>
                </div>
            </div>
        }
    }
}

export default ComponenteHistorial