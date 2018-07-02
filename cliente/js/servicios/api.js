
var url = "https://localhost:8888/"

class Api  {
    constructor() {
        this.API_URL = url
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
}



export default Api
