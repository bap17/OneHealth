
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
    
    comprobarCodigo(codigo, id) {
      return fetch(this.URLAPI + 'usuario/'+id+'/comprobarCod/'+codigo, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    getCita(idUsu, idCita) {
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/cita/'+idCita, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    litadoPacientes(idUsu) {
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/paciente', {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    buscarSip(idUsu, sip) {
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/paciente/'+sip, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
      }).then(function(respuesta) {
          return respuesta
      })

    }

    hola(disp, idUsu) {
      console.log("dispoini")
      return fetch(this.URLAPI + 'usuario/'+idUsu+'/disponibilidad', {
                method: 'PUT',
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify(disp)
      }).then(function(respuesta) {
          return respuesta
      })

    }
}



export default Api
