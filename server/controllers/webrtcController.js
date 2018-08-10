//webrtcController.js
var mysql = require('mysql')
var connection = require('./bd')
var crypto = require('crypto')
var service = require('../services/services')


//Buscar un médico 
exports.buscarMedico = function(req, res) {
   var obj = req.params
    var especialidad = obj.espe
    console.log(especialidad)

    if( especialidad != null) {
        connection.query('SELECT us.* FROM medico as me right join usuario as us on us.id = me.id inner join especialidad as es on me.id = es.medico where es.nombre like ?', [especialidad], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar los medicos"})
                console.log("Hay un error al buscar los medicos")
            } else {
                if(results.length > 0) {
                    var medicos = new Array()
                                               
                    for(var i = 0;  i < results.length; i++) {                                        
                        var medico = {
                            "usuario" : results[i].nombre,
                            "apellidos": results[i].apellidos,
                            "username": results[i].username
                        }
                        medicos.push(medico)
                    }                  
                    res.status(200)                       
                    res.send(medicos)       
                } else {
                    res.status(404)
                    res.send({error: "No hay medicos en esa especialidad"})
                }
            }
        })
    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }
}

//Buscar un paciente
exports.buscarPaciente = function(req, res) {
    var obj = req.params
    var nombre = obj.nombre
    console.log(nombre)

    if( nombre != null && nombre != "") {
        connection.query('SELECT * FROM paciente as pa right join usuario as us on us.id = pa.id where us.nombre like ?', ['%'+nombre+'%'], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar los pacientes"})
                console.log("Hay un error al buscar los pacientes")
            } else {
                if(results.length > 0) {
                    var pacientes = new Array()
                                               
                    for(var i = 0;  i < results.length; i++) {                                        
                        var paciente = {
                            "usuario" : results[i].nombre,
                            "apellidos": results[i].apellidos,
                            "username": results[i].username
                        }
                        pacientes.push(paciente)
                    }
                                   
                    res.status(200)                       
                    res.send(pacientes) 

                    /////////////////////////////       
                } else {
                    res.status(404)
                    res.send({error: "No hay pacientes con ese nombre"})
                }
            }
        })
    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }
}

//Buscar un paciente
exports.comprobarCodigo = function(req, res) {
    console.log("estoy en comprobarCodigo")
    var obj = req.params
    var codigo = obj.cod
    var idUsu = obj.id

    if( codigo != null && codigo != "" && idUsu != null && idUsu != "") {
        connection.query('SELECT * FROM cita as ci where ci.paciente = ? and tipo = 1 and codigo like ?', [idUsu, codigo], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar la cita"})
                console.log("Hay un error al buscar la cita")
            } else {
                if(results.length > 0) {
                    console.log("medico : "+results[0].medico)
                    connection.query('SELECT * FROM usuario as us where id = ?', [results[0].medico], function(err, results1) {
                        if(err) {
                            res.status(500)
                            res.send({error: "Hay un error al buscar al medico"})
                            console.log("Hay un error al buscar al medico")
                        } else {
                            if(results1.length > 0) {


                                var fecha = service.decrypt({text:results[0].fecha,clave:results1[0].clave})
                                var hora = service.decrypt({text:results[0].hora,clave:results1[0].clave})
                                //var cod = service.decrypt({text:results[0].codigo,clave:results1[0].clave})

                               // console.log(cod)

                               if(codigo == results[0].codigo) {
                                    var currentHour = getTime()
                                    var currentDate = getDate()
                                    var d = new Date();

                                    if(fecha == currentDate) {

                                        var resp = comprobarHora(hora, d)
                                        console.log(resp)
                                        var respuesta
                                        var status

                                        switch(resp) {
                                            case 1:   
                                                respuesta = "Entra en el intervalo" 
                                                status = 200
                                                break;
                                            case 0:
                                                respuesta = "La cita ha caducado"
                                                status = 202
                                                break;
                                            case -1: 
                                                respuesta = "Aun no puede comenzar la videollamada"
                                                status = 202
                                                break;
                                            default:
                                                respuesta = "Hay un error"
                                                status = 500
                                        }
                                        
                                        res.status(status)
                                        res.send({respuesta: respuesta})
                                        
                                    } else {
                                        res.status(202)
                                        res.send({respuesta: "No hay cita programada para este día"})
                                    }
                               }


                                

                            }else {
                                res.status(404)
                                res.send({error: "No hay usuario con ese nombre"})
                            }
                        }
                    })
                                     
                } else {
                    res.status(404)
                    res.send({error: "No hay pacientes con ese nombre"})
                }
            }
        })
    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }
}



function getDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function getTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;


    return  hour + ":" + min + ":" + sec;

}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}


function decreaseMinutes(date, minutes) {
    return new Date(date.getTime() - minutes*60000);
}


function comprobarHora(horaCita, date) {

    console.log("//////////////////////////////")

    var parte = horaCita.split(":");

    var hora = parseInt(parte[0])
    console.log(horaCita)
    console.log("hora: "+hora)
    var horaCita = new Date(date.getFullYear(), date.getMonth(),date.getDate(),hora, parseInt(parte[1]), parseInt(parte[2]),00);
    //var horaSumada = addMinutes(date, 30)
    //var horaRestada = decreaseMinutes(date, 30)

    var horaSumada = addMinutes(horaCita, 30)
    var horaRestada = decreaseMinutes(horaCita, 10)
    console.log("hora actual: "+ date)
    console.log("hora sumada: " +horaSumada)
    console.log("hora cita: " +horaCita)

    if(date >= horaRestada) {
        if(date <= horaSumada) {
            console.log("Esta en el intervalo")
            return 1;
            
        } else {
            console.log("La cita ha caducado")
            return 0
        }

    } else {
        console.log("Aun no puede comenzar la llamada, espere unos minutos")
        return -1
    }





    /*if(horaCita >= date && horaCita <= ) {
        if(horaCita <= horaSumada) {
            console.log("Entra dentro de los intervalos")
            return 1;
        } else {
            console.log("Cita caducada")
            return 0;
        }
    } else {
        console.log("Cita caducada")
        return -1;
        
    }*/

    console.log("//////////////////////////////")


}