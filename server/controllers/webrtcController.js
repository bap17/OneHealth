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

//Buscar un paciente por nombre
exports.buscarPacienteNombre = function(req, res) {
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

//Buscar un paciente por sip
exports.buscarPacienteSip = function(req, res) {
    var obj = req.params
    var sip = obj.sip

    if( sip != null && sip != "") {
        connection.query('SELECT * FROM paciente as pa inner join usuario as us on us.id = pa.id where pa.sip like ? and us.disponible = 1', ['%'+sip+'%'], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar los pacientes"})
                console.log("Hay un error al buscar los pacientes")
            } else {
                if(results.length > 0) {
                    var pacientes = new Array()
                                               
                    for(var i = 0;  i < results.length; i++) {                                        
                        var paciente = {
                            "nombre" : results[i].nombre,
                            "apellidos": results[i].apellidos,
                            "sip": results[i].sip
                        }
                        pacientes.push(paciente)
                    }

                    var resultado ={"pacientes": pacientes}
                                   
                    res.status(200)                       
                    res.send(resultado)  
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



//Listar pacientes
exports.listarPaciente = function(req, res) {
        connection.query('SELECT * FROM paciente as pa inner join usuario as us on us.id = pa.id where us.disponible = 1', [], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar los pacientes"})
                console.log("Hay un error al buscar los pacientes")
            } else {
                if(results.length > 0) {
                    var pacientes = new Array()
                                               
                    for(var i = 0;  i < results.length; i++) {                                        
                        var paciente = {
                            "id": results[i].id,
                            "nombre" : results[i].nombre,
                            "apellidos": results[i].apellidos,
                            "sip": results[i].sip
                        }
                        pacientes.push(paciente)
                    }

                    var resultado ={"pacientes": pacientes}
                                   
                    res.status(200)                       
                    res.send(resultado)   
                } else {
                    res.status(404)
                    res.send({error: "No hay pacientes con ese nombre"})
                }
            }
        })
}


//Ver una cita concreta
exports.verCita = function(req, res) {
    var obj = req.params
    var idCita = obj.idCita
    if( idCita != null && idCita != "") {
        connection.query('SELECT * FROM cita as ci where id = ?', [idCita], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar la cita"})
                console.log("Hay un error al buscar la cita")
            } else {
                if(results.length > 0) {

                    connection.query('SELECT * FROM usuario as us where id = ?', [results[0].paciente], function(err, results1) {
                        if(err) {
                            res.status(500)
                            res.send({error: "Hay un error al buscar el paciente"})
                            console.log("Hay un error al buscar el paciente")
                        } else {
                            if(results1.length > 0) {
                                connection.query('SELECT us.nombre, us.apellidos, es.nombre as espe, us.clave, us.id FROM usuario as us inner join especialidad as es on us.id = es.medico where us.id = ?', [results[0].medico], function(err, results2) {
                                    if(err) {
                                        res.status(500)
                                        res.send({error: "Hay un error al buscar el paciente"})
                                        console.log("Hay un error al buscar el paciente")
                                    } else {
                                        if(results2.length > 0) {
                                            var fecha = service.decrypt({text:results[0].fecha,clave:results[0].origen})
                                            var hora = service.decrypt({text:results[0].hora,clave:results[0].origen})

                                            var resu = {
                                                nombrePac: results1[0].nombre,
                                                apellidosPac: results1[0].apellidos,
                                                emailPac: results1[0].email,
                                                nombreMed: results2[0].nombre,
                                                apellidosMed: results2[0].apellidos,
                                                especialidad: results2[0].espe,
                                                idMedico: results2[0].id,
                                                fecha: fecha,
                                                hora: hora

                                            }

                                            res.status(200)
                                            res.send(resu)


                                        } else {
                                            res.status(404)
                                            res.send({error: "No hay medicos con ese id"})
                                        }
                                    }
                                })


                            } else {
                                res.status(404)
                                res.send({error: "No hay pacientes con ese id"})

                            }
                        }
                    })
                    

                } else {
                    res.status(404)
                    res.send({error: "No hay citas con ese id"})
                }
            }
        })
    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }
}





//Comprobar codigo de cita videollamada
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

                                var fecha = service.decrypt({text:results[0].fecha,clave:results[0].origen})
                                var hora = service.decrypt({text:results[0].hora,clave:results[0].origen})
                                console.log(hora)
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
                                        res.send({respuesta: respuesta,  id: results[0].id}) 
                                        
                                    } else {
                                        res.status(202)
                                        res.send({respuesta: "No hay cita programada para este día", id: results[0].id})
                                    }
                               }


                                

                            }else {
                                res.status(404)
                                res.send({respuesta: "No hay medico con ese nombre"})
                            }
                        }
                    })
                                     
                } else {
                    res.status(404)
                    res.send({respuesta: "No hay ningun código igual"})
                }
            }
        })
    } else {
        res.status(400)
        res.send({respuesta: "Alguno de los campos es invalido"})
    }
}


//Cambiar estado
exports.cambiarEstado = function(req, res) {
    var obj = req.params
    var disponible = req.body.disponible
    var idUsu = obj.id
    console.log(disponible)
    console.log(idUsu)
    var dis = parseInt(disponible)
    if( idUsu != null && idUsu != "" && disponible != null && (disponible == 1 || disponible == 0) ) {
        connection.query('UPDATE usuario SET disponible = ? WHERE id = ?', [disponible, idUsu], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al modificar al usuario"})
                console.log("Hay un error al modificar al usuario")
            } else {   
                res.status(204)  
                res.send("Se ha actualizado correctamente")       
            }
        })
    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }

}




exports.nuevoVideo=function(pet,res){
    var idUsu = pet.params.idUsu
    var idCon = pet.params.idCon
    var video = pet.body.video
    var mensajes = pet.body.mensajes
    console.log(idUsu)
    console.log(idCon)
    console.log(video)
    console.log(mensajes)

    if( idUsu != null && idUsu != "" && video != null && video != undefined &&  idCon != null && idCon != "" && mensajes != "" && mensajes != null) {

        connection.query('SELECT * FROM consulta WHERE id = ?',[idCon],function (err2, results1) {
            if(err2) {
                console.log(err2)
                res.status(500)
                res.send({error: "Hay un error al insertar el video"})
                console.log("Hay un error al insertar el video")
            } else {
                if(results1.length > 0) {
                    var v = service.encrypt({text:video,clave:results1[0].clave_origen})
                    var m = service.encrypt({text:mensajes,clave:results1[0].clave_origen})

                    connection.query('INSERT INTO video (consulta, video, mensajes) VALUES(?,?,?)',[idCon, v, m],function (err2, results2) {
                        if(err2) {
                            console.log(err2)
                            res.status(500)
                            res.send({error: "Hay un error al insertar el video"})
                            console.log("Hay un error al insertar el video")
                        } else {
                            res.status(201)
                            res.send("Se ha introducido el video correctamente")
                        }
                    })
                } else {

                    res.status(404)
                    res.send({respuesta: "No hay ninguna consulta con ese id"})

                }
               
            }
        })

    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }
}



exports.verVideo=function(pet,res){
    var idUsu = pet.params.idUsu
    var idCon = pet.params.idCon


    if( idUsu != null && idUsu != "" &&   idCon != null && idCon != "") {
        connection.query('SELECT * FROM video as v inner join consulta as c on  c.id = v.consulta WHERE v.consulta = ?',[idCon],function (err2, results1) {
            if(err2) {
                console.log(err2)
                res.status(500)
                res.send({error: "Hay un error al insertar el video"})
                console.log("Hay un error al insertar el video")
            } else {
                if(results1.length > 0) {
                    var resul = {
                        "nombreVideo": service.decrypt({text:results1[0].video,clave:results1[0].clave_origen}),
                        "conversacion": service.decrypt({text:results1[0].mensajes,clave:results1[0].clave_origen})
                    }
                    res.status(200)
                    res.send(resul)
                } else {
                    res.status(404)
                    res.send("No se encuentra un video para la consulta")
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
    var horaCita = new Date(date.getFullYear(), date.getMonth(),date.getDate(),hora, parseInt(parte[1]), 00,00);
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