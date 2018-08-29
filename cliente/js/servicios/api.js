
var url = "https://localhost:8888/"
var url2 = "https://localhost:3000/"

class Api  {
    constructor() {
        this.API_URL = url,
        this.URLAPI = url2
    }

    //Inicializar
    init() {
        return fetch(this.API_URL+'connect?init=true', {
                   method: 'GET',
                   headers: {
                       'Content-type':'application/json'
                   }
               }).then(function (respuesta) {
                      console.log(respuesta)
                      //console.log(respuesta.json())
                      return respuesta.json()

               })
    }   

    //Conectar los dos puntos
    connect(ID) {
        console.log(ID)

        return fetch(this.API_URL+'connectTo', {
                   method: 'POST',
                   headers: {
                      'Content-type':'application/json'
                   },
                   body: JSON.stringify(ID)
               }).then(function (respuesta) {
                      //console.log(respuesta.json())
                      return respuesta.json()

               })
    }
    
    Login(user) {
        return fetch(this.URLAPI + 'login', {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json'
                   },
                   body: JSON.stringify(user)
               }).then(function (respuesta) {
                   return respuesta
               })
    }

    Confirmacion(codigo) {
        return fetch(this.URLAPI + 'login/codigo', {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json'
                   },
                   body: JSON.stringify(codigo)
               }).then(function (respuesta) {
                   return respuesta
               })
    }

    RegistroP(user) {
        return fetch(this.URLAPI + 'registro', {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json'
                   },
                   body: JSON.stringify(user)
               }).then(function (respuesta) {
                   return respuesta
               })
    }
    
    comprobarCodigo(codigo, id, token) {
      return fetch(this.URLAPI + 'usuario/'+id+'/comprobarCod/'+codigo, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': token
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    getCita(idUsu, idCita, token) {
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/cita/'+idCita, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': token
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    VerHistorial(id,sip, token) {
        return fetch(this.URLAPI + 'medico/'+ id + '/historial/' + sip, {
                   method: 'GET',
                   headers: {
                       'Content-type':'application/json',
                       'Authorization': token
                   },
               }).then(function (respuesta) {
                   return respuesta
               })
    }

    VerHistorialPaciente(id,token) {
        return fetch(this.URLAPI + 'usuario/'+ id + '/historial', {
                   method: 'GET',
                   headers: {
                       'Content-type':'application/json',
                       'Authorization': token
                   },
               }).then(function (respuesta) {
                   return respuesta
               })
    }

    litadoPacientes(idUsu, token) {
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/paciente', {
                method: 'GET',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': token
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    buscarSip(idUsu, sip, token) {
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/paciente/'+sip, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': token
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    disponible(disp, idUsu, token) {
      console.log("dispoini")
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/disponibilidad', {
                method: 'PUT',
                headers: {
                    'Content-type':'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(disp)
      }).then(function(respuesta) {
          return respuesta
      })

    }

    ListadoMedicos(id, token) {
        return fetch(this.URLAPI + 'usuario/'+id+'/medicos', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    CrearCita(id,cita, token) {
        return fetch(this.URLAPI + 'usuario/'+ id + '/cita', {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json',
                       'Authorization': token
                   },
                   body: JSON.stringify(cita)
               }).then(function (respuesta) {
                   return respuesta
               })
    }

    VerRecibidos(id, token) {
        return fetch(this.URLAPI + 'usuario/'+id+'/mensaje/recibidos', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    VerEnviados(id, token) {
        return fetch(this.URLAPI + 'usuario/'+id+'/mensaje/enviados', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    NuevoMensaje(id,mensaje, token) {
        return fetch(this.URLAPI + 'usuario/'+ id + '/mensaje', {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json',
                       'Authorization': token
                   },
                   body: JSON.stringify(mensaje)
               }).then(function (respuesta) {
                   return respuesta
               })
    }

    BorrarMensaje(id,mensaje,token){
        return fetch(this.URLAPI + 'usuario/'+ id + '/mensaje/' + mensaje, {
            method: 'DELETE',
            headers: {
                'Content-type':'application/json',
                'Authorization': token
            }
        }).then(function (respuesta) {
            return respuesta
        })
    }

    NuevaConsulta(id,consulta, token) {
        return fetch(this.URLAPI + 'medico/'+ id + '/historial/consulta', {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json',
                       'Authorization': token
                   },
                   body: JSON.stringify(consulta)
               }).then(function (respuesta) {
                   return respuesta
               })
    }

    CitasMedico(id, token) {
        return fetch(this.URLAPI + 'medico/'+id+'/citas', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    CitasVMedico(id, token) {
        return fetch(this.URLAPI + 'medico/'+id+'/citas/video', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    CitasPMedico(id, token) {
        return fetch(this.URLAPI + 'medico/'+id+'/citas/presencial', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    CitasPaciente(id, token) {
        return fetch(this.URLAPI + 'usuario/'+id+'/citas', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    CitasVPaciente(id, token) {
        return fetch(this.URLAPI + 'usuario/'+id+'/citas/video', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }

    CitasPPaciente(id, token) {
        return fetch(this.URLAPI + 'usuario/'+id+'/citas/presencial', {
                  method: 'GET',
                  headers: {
                      'Content-type':'application/json',
                      'Authorization': token
                  }
        }).then(function(respuesta) {
            return respuesta
        })
  
    }
}



export default Api
