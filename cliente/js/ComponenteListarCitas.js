import React, { Component } from 'react'
import API from './servicios/api'
import Cita from './ComponenteCita'
import VerCita from './ComponenteVerCita'

class ComponenteListarCitas extends Component {
    constructor(props) {
        super(props)
        this.state = {  
          error: false,
          citasMedico: [],
          citasPaciente: [],
          vMedico: [],
          pMedico: [],
          vPaciente: [],
          pPaciente: [],
          noPaciente: false,
          noMedico: false,
          tipo: 3,
          detalles:false,
          cita: undefined
        };
        this.errores = this.errores.bind(this)
        this.citasMedico = this.citasMedico.bind(this)
        this.videoMedico = this.videoMedico.bind(this)
        this.presencialMedico = this.presencialMedico.bind(this)
        this.citasPaciente = this.citasPaciente.bind(this)
        this.videoPaciente = this.videoPaciente.bind(this)
        this.presencialPaciente = this.presencialPaciente.bind(this)
        this.cambiarTipo = this.cambiarTipo.bind(this)
        this.obtenerCita = this.obtenerCita.bind(this)
        this.ocultarDetalles = this.ocultarDetalles.bind(this)
    }

    errores(){
        this.setState({error:true})
    }

    citasMedico(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().CitasMedico(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    if(resp.citas==undefined){
                        this.setState({noMedico:true})
                    }else{
                        this.setState({citasMedico:resp.citas})
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

    citasPaciente(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().CitasPaciente(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    if(resp.citas==undefined){
                        this.setState({noPaciente:true})
                    }else{
                        this.setState({citasPaciente:resp.citas})
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

    videoMedico(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().CitasVMedico(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({vMedico:resp.citas})
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

    videoPaciente(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().CitasVPaciente(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({vPaciente:resp.citas})
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

    presencialMedico(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().CitasPMedico(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({pMedico:resp.citas})
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

    presencialPaciente(){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().CitasPPaciente(id,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({pPaciente:resp.citas})
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

    componentDidMount(){
        var tipo = localStorage.getItem('tipo')
        if(tipo=="medico"){
            this.citasMedico()
            this.presencialMedico()
            this.videoMedico()
        }else{
            this.citasPaciente()
            this.presencialPaciente()
            this.videoPaciente()
        }
        
    }

    cambiarTipo(){
        this.setState({tipo:this.campoTipo.value})
    }

    ocultarDetalles(){
        this.setState({detalles:false})
    }

    obtenerCita(idCita){
        var auxStatus
        var auxMensaje
        var id = localStorage.getItem('id')
        var token = localStorage.getItem('token')

        new API().getCita(id,idCita,token).then(datos=>{
            if(datos.status!=200){
                auxStatus=datos.status.toString()
                this.errores()
            }else{
                datos.json().then(resp=>{
                    this.setState({cita:resp})
                    this.setState({detalles:true})
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
        var tipo = localStorage.getItem('tipo')
        if(tipo=="medico" && !this.state.detalles){
            var med = []
            var vmed = []
            var pmed = []
            for(var i=0; i<this.state.citasMedico.length;i++) {
                var elemento
                elemento = <Cita handleVer={this.obtenerCita} cita={this.state.citasMedico[i]} key={i}/>
                med.push(elemento)
            }
            for(var i=0; i<this.state.vMedico.length;i++) {
                var elemento
                elemento = <Cita handleVer={this.obtenerCita} cita={this.state.vMedico[i]} key={i}/>
                vmed.push(elemento)
            }
            for(var i=0; i<this.state.pMedico.length;i++) {
                var elemento
                elemento = <Cita handleVer={this.obtenerCita} cita={this.state.pMedico[i]} key={i}/>
                pmed.push(elemento)
            }

            if(this.state.tipo==3){
                return <div className="listar-citas">
                    <label className="titulo-comp-cita">Citas</label>
                    <br></br>

                    <div className="form-citas">
                        <label className="label-citas">Filtrar por:</label>
                        
                        <select className="form-control" onChange={this.cambiarTipo} ref={(campo)=>{this.campoTipo=campo}}>
                            <option value="3" defaultValue> -- Todas -- </option>
                            <option value="0">Presencial</option>
                            <option value="1">Videollamada</option>
                        </select>
                    </div>
                            
                    <div className="clear"></div>
                    <div className="panel-citas">
                        <div className="card">
                            <div className="card-header">Citas</div>
                            <div className="card-body">
                                {this.state.noPaciente ? <ul className="list-group"> No tienes citas </ul>:<ul className="list-group"> {med} </ul>}
                            </div>
                        </div>
                    </div>
                    
                </div>
            }else if(this.state.tipo==1){
                return <div className="listar-citas">
                    <label className="titulo-comp-cita">Citas</label>
                    <br></br>
                    <div className="form-citas">
                        <label className="label-citas">Filtrar por:</label>
                        
                        <select className="form-control" onChange={this.cambiarTipo} ref={(campo)=>{this.campoTipo=campo}}>
                            <option value="3" defaultValue> -- Todas -- </option>
                            <option value="0">Presencial</option>
                            <option value="1">Videollamada</option>
                        </select>
                    </div>  
                    <div className="clear"></div>
                    <div className="panel-citas">
                        <div className="card">
                            <div className="card-header">Citas</div>
                            <div className="card-body">
                                {this.state.noPaciente ? <ul className="list-group"> No tienes citas </ul>:<ul className="list-group"> {vmed} </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            }else{
                return <div className="listar-citas">
                    <label className="titulo-comp-cita">Citas</label>
                    <br></br>
                    <div className="form-citas">
                        <label className="label-citas">Filtrar por:</label>
                        
                        <select className="form-control" onChange={this.cambiarTipo} ref={(campo)=>{this.campoTipo=campo}}>
                            <option value="3" defaultValue> -- Todas -- </option>
                            <option value="0">Presencial</option>
                            <option value="1">Videollamada</option>
                        </select>
                    </div>  
                    <div className="clear"></div>
                    <div className="panel-citas">
                        <div className="card">
                            <div className="card-header">Citas</div>
                            <div className="card-body">
                                {this.state.noPaciente ? <ul className="list-group"> No tienes citas </ul>:<ul className="list-group"> {pmed} </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        }else if(tipo=="paciente" && !this.state.detalles){
            var pac = []
            var vpac = []
            var ppac = []
            for(var i=0; i<this.state.citasPaciente.length;i++) {
                var elemento
                elemento = <Cita handleVer={this.obtenerCita} cita={this.state.citasPaciente[i]} key={i}/>
                pac.push(elemento)
            }
            for(var i=0; i<this.state.vPaciente.length;i++) {
                var elemento
                elemento = <Cita handleVer={this.obtenerCita} cita={this.state.vPaciente[i]} key={i}/>
                vpac.push(elemento)
            }
            for(var i=0; i<this.state.pPaciente.length;i++) {
                var elemento
                elemento = <Cita handleVer={this.obtenerCita} cita={this.state.pPaciente[i]} key={i}/>
                ppac.push(elemento)
            }

            if(this.state.tipo==3){
                return <div className="listar-citas">
                    <label className="titulo-comp-cita">Citas</label>
                    <br></br>

                    <div className="form-citas">
                        <label className="label-citas">Filtrar por:</label>
                        
                        <select className="form-control" onChange={this.cambiarTipo} ref={(campo)=>{this.campoTipo=campo}}>
                            <option value="3" defaultValue> -- Todas -- </option>
                            <option value="0">Presencial</option>
                            <option value="1">Videollamada</option>
                        </select>
                    </div>
                            
                    <div className="clear"></div>
                    <div className="panel-citas">
                        <div className="card">
                            <div className="card-header">Citas</div>
                            <div className="card-body">
                                {this.state.noPaciente ? <ul className="list-group"> No tienes citas </ul>:<ul className="list-group"> {pac} </ul>}
                            </div>
                        </div>
                    </div>
                    
                </div>
            }else if(this.state.tipo==1){
                return <div className="listar-citas">
                    <label className="titulo-comp-cita">Citas</label>
                    <br></br>
                    <div className="form-citas">
                        <label className="label-citas">Filtrar por:</label>
                        
                        <select className="form-control" onChange={this.cambiarTipo} ref={(campo)=>{this.campoTipo=campo}}>
                            <option value="3" defaultValue> -- Todas -- </option>
                            <option value="0">Presencial</option>
                            <option value="1">Videollamada</option>
                        </select>
                    </div>  
                    <div className="clear"></div>
                    <div className="panel-citas">
                        <div className="card">
                            <div className="card-header">Citas</div>
                            <div className="card-body">
                                {this.state.noPaciente ? <ul className="list-group"> No tienes citas </ul>:<ul className="list-group"> {vpac} </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            }else{
                return <div className="listar-citas">
                    <label className="titulo-comp-cita">Citas</label>
                    <br></br>
                    <div className="form-citas">
                        <label className="label-citas">Filtrar por:</label>
                        
                        <select className="form-control" onChange={this.cambiarTipo} ref={(campo)=>{this.campoTipo=campo}}>
                            <option value="3" defaultValue> -- Todas -- </option>
                            <option value="0">Presencial</option>
                            <option value="1">Videollamada</option>
                        </select>
                    </div>  
                    <div className="clear"></div>
                    <div className="panel-citas">
                        <div className="card">
                            <div className="card-header">Citas</div>
                            <div className="card-body">
                                {this.state.noPaciente ? <ul className="list-group"> No tienes citas </ul>:<ul className="list-group"> {ppac} </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            }

        }else if(this.state.detalles){
            return <VerCita ocultar={this.ocultarDetalles} cita={this.state.cita}></VerCita>
            
        }

    }

}

export default ComponenteListarCitas