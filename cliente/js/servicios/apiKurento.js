
var url = "https://localhost:3000/"

class ApiKurento  {

    constructor() {
        this.API_URL = url
    }

        //Inicializar
    init1() {
        return fetch(this.API_URL+'kurento/init1', {
                   method: 'GET',
                   headers: {
                       'Content-type':'application/json'
                   }
               }).then(function (respuesta) {
                      console.log(respuesta)
                      //console.log(respuesta.json())
                      return respuesta;

               })
    }  

    //Inicializar
    init() {
        return fetch(this.API_URL+'kurento/init', {
                   method: 'GET',
                   headers: {
                       'Content-type':'application/json'
                   }
               }).then(function (respuesta) {
                      console.log(respuesta)
                      //console.log(respuesta.json())
                      return respuesta;

               })
    }   

}



export default ApiKurento
